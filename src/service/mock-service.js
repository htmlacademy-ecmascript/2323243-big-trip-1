import { generateDestination } from '../mock/destination.js';
import { generatePoint } from '../mock/point.js';
import { generateOffer } from '../mock/offers.js';

import { getRandomInteger, getRandomArrayElement } from '../utils/common.js';
import { TYPES } from '../const.js';

export default class MockService {
  #destinations = [];
  #offers = [];
  #points = [];

  constructor() {
    this.#destinations = this.#generateDestinations();
    this.#offers = this.#generateOffers();
    this.#points = this.#generatePoints();
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get points() {
    return this.#points;
  }

  #generateDestinations() {
    return Array.from({ length: 25 },
      () => generateDestination()
    );
  }

  #generateOffers() {
    return TYPES.map((type) => ({
      type,
      offers: Array.from({ length: getRandomInteger(0, 5) }, () => generateOffer(type))
    }));
  }

  #generatePoints() {
    return Array.from({ length: 5 }, () => {
      const type = getRandomArrayElement(TYPES);
      const destination = getRandomArrayElement(this.#destinations);

      const hasOffers = getRandomInteger(0, 1);

      const offersByType = this.#offers
        .find((offerByType) => offerByType.type === type);

      const offerIds = (hasOffers) ? offersByType.offers
        .slice(0, getRandomInteger(0, 5))
        .map((offer) => offer.id)
        : [];
      return generatePoint(type, destination.id, offerIds);
    });
  }
}
