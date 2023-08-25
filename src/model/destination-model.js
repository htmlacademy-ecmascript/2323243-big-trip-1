export default class DestinationsModel {

  #destinations = null;

  constructor(service) {
    this.#destinations = service.destinations;
  }

  get destinations() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations
      .find((destination) => destination.id === id);
  }
}
