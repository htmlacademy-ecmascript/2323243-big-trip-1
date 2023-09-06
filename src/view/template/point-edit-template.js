import { CITIES, TYPES } from '../../const.js';
import { createOffersList } from './point-edit-offers-template.js';
import { createDistinationsList } from './point-edit-destination-template.js';
import { createTypeList } from './point-edit-type-list.js';
import { createPointEditControlsTemplate } from './point-edit-control-template.js';
import { humanizePointDueDateTime } from '../../utils/point.js';

function createPointEditTemplate({ state, pointDestinations, pointOffers, typeButton }) {
  const { point } = state;
  const { basePrice, dateFrom, dateTo, destination, type } = point;
  const pointDestination = pointDestinations.find((currentDestination) => currentDestination.id === destination);
  const currentOffers = createOffersList(point, pointOffers, { type });

  /* const form = document.querySelector('.event__input--time'); // Найдем форму редактирования

 // Добавим обработчик события отправки формы
  form.addEventListener('submit', (event) => {
    const startTimeInput = document.getElementById('event-start-time-1');
    const endTimeInput = document.getElementById('event-end-time-1');

    // Проверяем, пусты ли оба поля
    if (!startTimeInput.value.trim() || !endTimeInput.value.trim()) {
      event.preventDefault(); // Отменяет отправку формы, если даты не заполнены
      alert('Please enter date and time.'); // Выводит сообщение об ошибке
    }
  }); */

  return (`
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
          value="${pointDestination?.name ?? ' '}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${CITIES.map((city) => (`<option value="${city}"></option>`)).join(' ')}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text"
          name="event-start-time" value="${humanizePointDueDateTime(dateFrom)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text"
          name="event-end-time" value="${humanizePointDueDateTime(dateTo)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number"
            name="event-price" min="0" value="${basePrice}">
        </div>

        ${createPointEditControlsTemplate(typeButton)}
      </header>

      <section class="event__details">
        <section class="event__section  event__section--offers ${currentOffers.length
      === 0 ? 'visually-hidden' : ''}">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
          ${currentOffers}
          </div>
        </section>
        ${(pointDestinations !== null) ? createDistinationsList(pointDestination) : ' '}
      </section >
    </form >
    </li > `
  );
}

export { createPointEditTemplate };
