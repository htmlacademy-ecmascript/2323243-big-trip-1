export default class OffersModel {

  #offers = null;

  constructor(service) {
    this.#offers = service.offers;
  }

  get offers() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers
      .find((offer) => offer.type === type).offers;
  }
}
