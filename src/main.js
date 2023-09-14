import { render } from './framework/render.js';
import NewPointButtonView from './view/new-point-btn-view.js';
import FilterModel from './model/filter-model.js';
import PointsModel from './model/points-model.js';
import RoutePresenter from './presenter/route-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic tS7JfS35wdl2sf5l';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const headerElement = document.querySelector('.page-header');
const mainElement = document.querySelector('.page-body__page-main');
const tripMainElement = document.querySelector('.trip-main');
const tripControlsElement = headerElement.querySelector('.trip-controls__filters');
const tripEventsElement = mainElement.querySelector('.trip-events');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const routePresenter = new RoutePresenter(tripEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsElement, filterModel, pointsModel);
const tripInfoPresenter = new TripInfoPresenter(tripMainElement, pointsModel);
const newPointButtonComponent = new NewPointButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  routePresenter.createPoint(handleNewPointFormClose);

  newPointButtonComponent.element.disabled = true;
};


filterPresenter.init();
routePresenter.init();
pointsModel.init()
  .finally(() => {
    render(newPointButtonComponent, tripMainElement);
    newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
  });
tripInfoPresenter.init();
