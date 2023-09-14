import TripInfoView from './view/trip-info-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import MockService from './service/mock-service.js';
import DestinationsModel from './model/destination-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import { render, RenderPosition } from './framework/render.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic qwerty12345';
const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';

const tripMainElement = document.querySelector('.trip-main');
const tripFilltersElement = document.querySelector('.trip-controls__filters');
const mainContentElement = document.querySelector('.trip-events');

const mockService = new MockService();
const destinationsModel = new DestinationsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(mockService);
const filterModel = new FilterModel();


const boardPresenter = new BoardPresenter({
  boardContainer: mainContentElement,
  destinationsModel,
  offersModel,
  pointsModel,
  filterModel,
  newPointButtonContainer: tripMainElement
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripFilltersElement,
  filterModel,
  pointsModel
});


render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);

boardPresenter.init();
filterPresenter.init();

pointsModel.init();
