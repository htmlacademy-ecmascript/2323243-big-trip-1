import { render, remove, RenderPosition } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view';
import { sortPointsByDate } from '../utils/sort.js';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #pointsModel = null;
  #tripInfoComponent = null;

  constructor(tripInfoContainer, pointsModel) {

    this.#tripInfoContainer = tripInfoContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);

  }

  get points () {
    return this.#pointsModel.points.sort(sortPointsByDate);
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  init = () => {

    if (this.#tripInfoComponent instanceof TripInfoView) {
      remove(this.#tripInfoComponent);
    }

    if(this.points.length !== 0) {
      this.#tripInfoComponent = new TripInfoView(this.points, this.offers, this.destinations);
      render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
    }
  };


  destroy = () => {
    if(this.#tripInfoComponent === null) {
      return;
    }

    remove(this.#tripInfoComponent);
    this.#tripInfoComponent = null;
  };

  #handleModelEvent = () => {
    this.init();
  };

}
