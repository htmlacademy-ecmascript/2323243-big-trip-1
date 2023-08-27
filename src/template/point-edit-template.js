import { CITIES, TYPES } from '../const.js';
import dayjs from 'dayjs';
import { createOffersList } from './point-edit-offers-template.js';
import { createDistinationsList } from './point-edit-distination-template.js';
import { createTypeList } from './point-edit-type-list.js';

function createPointEditTemplate({ state, pointDestination, pointOffers }) {
  const { point } = state;
  const { basePrice, dateFrom, dateTo, destination, type } = point;
  return (/* html */`
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        ${createTypeList({ type }, TYPES)}
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination"
          id="event-destination-1" type="text" name="event-destination"
          value="${pointDestination.find((el) => el.id === destination).name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${CITIES.map((city) => (`<option value="${city}"></option>`)).join(' ')}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text"
          name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text"
          name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
          ${createOffersList(point, pointOffers, { type })}
          </div>
        </section>
        ${createDistinationsList(pointDestination, { destination })}

      </section>
    </form>
    </li>`
  );
}

export { createPointEditTemplate };
