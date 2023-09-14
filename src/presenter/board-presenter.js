import EventListView from '../view/event-list-view.js';
import { remove, render, RenderPosition, replace } from '../framework/render.js';
import NoPointView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';
import LoadingView from '../view/loading-view.js';
import PointPresenter from './point-presenter.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { sort } from '../utils/sort.js';
import { filter } from '../utils/filter.js';
import NewPointPresenter from './new-point-presenter.js';
import NewPointButtonView from '../view/new-point-button-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class BoardPresenter {

  #listComponent = new EventListView();
  #boardContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #sortComponent = null;
  #noPointComponent = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #filterModel = null;
  #filterType = FilterType.EVERYTHING;
  #newPointPresenter = null;
  #isCreating = null;
  #newPointButton = null;
  #newPointButtonContainer = null;
  #loadingComponent = new LoadingView();
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });


  constructor({ boardContainer, newPointButtonContainer, destinationsModel, offersModel, pointsModel, filterModel }) {
    this.#boardContainer = boardContainer;
    this.#newPointButtonContainer = newPointButtonContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#listComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#newPointDestroyHandler
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const filteredPoints = filter[this.#filterType](this.#pointsModel.points);
    return sort[this.#currentSortType](filteredPoints);
  }

  init() {
    this.#newPointButton = new NewPointButtonView({
      onClick: this.#newPointButtonClickHandler
    });
    render(this.#newPointButton, this.#newPointButtonContainer);
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updateTask(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addTask(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deleteTask(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    remove(this.#loadingComponent);
  }

  #renderSort(container) {
    const prevSortComponent = this.#sortComponent;

    this.#sortComponent = new SortView({
      sortType: this.#currentSortType,
      onSortTypeChange: this.#sortTypeChangeHandler
    });
    if (prevSortComponent) {
      replace(this.#sortComponent, prevSortComponent);
      remove(prevSortComponent);
    } else {
      render(this.#sortComponent, container, RenderPosition.AFTERBEGIN);
    }
  }


  #renderNoPoints() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType
    });

    render(this.#noPointComponent, this.#boardContainer);
  }

  #clearBoard({ resetSortType = false } = {}) {
    this.#clearPointList();

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }


  #renderPoints() {
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#boardContainer.element, RenderPosition.AFTERBEGIN);
  }

  #renderBoard() {
    render(this.#listComponent, this.#boardContainer);

    if (this.points.length === 0 && !this.#isCreating) {
      this.#renderNoPoints();
      return;
    }
    this.#clearBoard();
    this.#renderSort(this.#boardContainer);
    this.#renderPoints();

    if (this.#isLoading) {
      this.#renderLoading();
    }
  }

  #sortTypeChangeHandler = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderSort(this.#boardContainer);
    this.#renderPoints();
  };

  #newPointButtonClickHandler = () => {
    this.#isCreating = true;
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointButton.element.disabled = true;
    this.#newPointPresenter.init();
  };

  #newPointDestroyHandler = (isCanceled) => {
    this.#isCreating = false;
    this.#newPointButton.element.disabled = false;

    if (isCanceled && this.points.length === 0) {
      remove(this.#sortComponent);
      this.#sortComponent = null;
      this.#renderNoPoints();
    }
  };
}
