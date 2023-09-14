import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';
import { capitalizeFirstLetter } from '../utils/point.js';

const SORT_TYPES = [
  {
    name: 'day',
    type: SortType.DEFAULT,
    isDisabled: false,
  },
  {
    name: 'event',
    type: '',
    isDisabled: true,
  },
  {
    name: 'time',
    type: SortType.TIME,
    isDisabled: false,
  },
  {
    name: 'price',
    type: SortType.PRICE,
    isDisabled: false,
  },
  {
    name: 'offers',
    type: '',
    isDisabled: true,
  },
];

const createTypeSortTemplate = (sortType) => SORT_TYPES.map(({ name, type, isDisabled }) => `<div class="trip-sort__item  trip-sort__item--${name}">
<input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" data-sort-type="${type}" ${sortType === type ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
<label class="trip-sort__btn" for="sort-${name}">${capitalizeFirstLetter(name)}</label>
</div>`).join('\n');

const createPointSortTemplate = (sortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${createTypeSortTemplate(sortType)}
</form>`
);

export default class PointSortView extends AbstractView {
  #sortType = null;

  constructor(sortType) {
    super();
    this.#sortType = sortType;
  }

  get template() {
    return createPointSortTemplate(this.#sortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.type !== 'radio') {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
