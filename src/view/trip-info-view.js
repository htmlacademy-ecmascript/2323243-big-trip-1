import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';

const addOffersPrices = (pointType, pointOffers, allOffers) => {

  const allOffersForType = allOffers.find(({ type }) => type === pointType).offers;

  const selectedOfferPrices = pointOffers.map((offer) => allOffersForType.find(({ id }) => id === offer).price);

  return selectedOfferPrices.reduce((sum, price) => sum + price, 0);

};

const addDestinationName = (pointDestination, allDestinations) => allDestinations.find(({ id }) => id === pointDestination).name;

const getTripDestinationNames = (points) => {

  const tripDestinationNames = points.map((point) => point.destinationName);

  switch (tripDestinationNames.length) {
    case 1:
      return `${tripDestinationNames[0]}`;
    case 2:
      return `${tripDestinationNames[0]} &mdash; ${tripDestinationNames[1]}`;
    case 3:
      return `${tripDestinationNames[0]} &mdash; ${tripDestinationNames[1]} &mdash; ${tripDestinationNames[2]}`;
    default:
      return `${tripDestinationNames[0]} &mdash; ... &mdash;${tripDestinationNames[tripDestinationNames.length - 1]}`;
  }

};

const getTripPrice = (points) => {

  const totalPrice = points.reduce((total, point) => total + point.basePrice + point.offerPrices, 0);

  return totalPrice;
};

const getTripDates = (points) => {

  const startTripDate = points[0].startDate;
  const endTripDate = points[points.length - 1].endDate;

  if (dayjs(startTripDate).month() === dayjs(endTripDate).month()) {
    return `${dayjs(startTripDate).format('MMM D')}&nbsp;&mdash;&nbsp;${dayjs(endTripDate).format('DD')}`;
  }

  return `${dayjs(startTripDate).format('MMM D')}&nbsp;&mdash;&nbsp;${dayjs(endTripDate).format('MMM D')}`;

};

const createTripInfoTemplate = (points, allOffers, allDestinations) => {

  const tripPoints = points.map((point) => ({...point, offerPrices: addOffersPrices(point.type, point.offers, allOffers), destinationName: addDestinationName(point.destination, allDestinations)}));

  return (
    `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${getTripDestinationNames(tripPoints)}</h1>

    <p class="trip-info__dates">${getTripDates(tripPoints)}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTripPrice(tripPoints)}</span>
  </p>
</section>`
  );
};

export default class TripInfoView extends AbstractView {
  #points = null;
  #allOffers = null;
  #allDestinations = null;

  constructor(points, allOffers, allDestinations) {
    super();
    this.#points = points;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
  }

  get template() {

    return createTripInfoTemplate(this.#points, this.#allOffers, this.#allDestinations);
  }

}
