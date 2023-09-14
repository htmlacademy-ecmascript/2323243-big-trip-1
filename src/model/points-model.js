import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class PointsModel extends Observable {

  #pointsApiService = null;
  #points = [];
  #offers = [];
  #destinations = [];

  constructor(service) {
    super();
    this.#pointsApiService = service;
  }

  get points() {
    console.log(this.#points);
    return this.#points;
  }

  get offers () {
    return this.#offers;
  }

  get destinations () {
    return this.#destinations;
  }

  init = async () => {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
      this.#offers = await this.#pointsApiService.offers;
      this.#destinations = await this.#pointsApiService.destinations;
    } catch(err) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  };

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }

  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }

  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      // Обратите внимание, метод удаления задачи на сервере
      // ничего не возвращает. Это и верно,
      // ведь что можно вернуть при удалении задачи?
      await this.#pointsApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      dueDate: point['due_date'] !== null ? new Date(point['due_date']) : point['due_date'], // На клиенте дата хранится как экземпляр Date
      isArchive: point['is_archived'],
      isFavorite: point['is_favorite'],
      repeating: point['repeating_days'],
    };

    // Ненужные ключи мы удаляем
    delete adaptedPoint['due_date'];
    delete adaptedPoint['is_archived'];
    delete adaptedPoint['is_favorite'];
    delete adaptedPoint['repeating_days'];

    return adaptedPoint;
  }
  // надо будет поправить

}
