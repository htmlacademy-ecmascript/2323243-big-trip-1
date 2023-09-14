import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeFirstLetter } from '../utils/point.js';

const createPointFilterTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return (
    `<div class="trip-filters__filter">
       <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${type === currentFilterType ? 'checked' : ''} ${count === 0 ? 'disabled' : ''}>
        <label class="trip-filters__filter-label" for="filter-${name}">${capitalizeFirstLetter(name)}</label>
    </div>`
  );
};

const createFiltersTemplate = (filterItems, currentFilterType) => {
  const filterPointsTemplate = filterItems
    .map((filter) => createPointFilterTemplate(filter, currentFilterType))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">
    ${filterPointsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};
export default class PointFilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };

}
