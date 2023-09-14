import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { NEW_POINT } from '../const.js';
import { convertPointDateForEditForm, capitalizeFirstLetter, isSubmitDisabledByDate, isSubmitDisabledByPrice, isSubmitDisabledByDestinationName } from '../utils/point.js';
import dayjs from 'dayjs';
import he from 'he';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const findOffersForType = (pointType, allOffers) => allOffers.find(({ type }) => type === pointType).offers;

const createDestionationsOptionsTemplate = (allDestinations) => allDestinations.map(({ name }) => `<option value="${name}"></option>`).join('\n');

const createAvailableOptionsTemplate = (pointOffers, allOffersForType) => allOffersForType.map((offer) => `<div class="event__offer-selector" >
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title.split(' ').pop()}-${offer.id}" type="checkbox" name="event-offer-${offer.title.split(' ').pop()}" ${pointOffers.includes(offer.id) ? 'checked' : ''}>
  <label class="event__offer-label" for="event-offer-${offer.title.split(' ').pop()}-${offer.id}">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>`).join('\n');

const getSelectedDestinationData = (destinationName, allDestinations) => {

  const selectedDestinationData = allDestinations.find(({ name }) => name === destinationName);

  if (selectedDestinationData === undefined) {
    return {
      name: destinationName,
      description: '',
      pictures: [],
    };
  }

  return selectedDestinationData;
};

const createPhotosListTemplate = (pictures) => `<div class="event__photos-container">
    <div class="event__photos-tape">
    ${pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="Event photo">`).join('\n')}
    </div>
    </div>`;

const createTypeListTemplate = (allOffers) => allOffers
  .map(({ type }) => `<div class="event__type-item">
  <input id="event-type-${type}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}">${capitalizeFirstLetter(type)}</label>
</div>`).join('\n');

const createPointEditTemplate = (point, allOffers, allDestinations) => {

  const {basePrice, selectedDestinationName, startDate, endDate, type, offers, isDisabled, isSaving, isDeleting} = point;

  const selectedDestinationData = getSelectedDestinationData(selectedDestinationName, allDestinations);

  const allOffersForType = findOffersForType(type, allOffers);

  const deletingPoint = isDeleting ? 'Deleting...' : 'Delete';

  return (
    `<li class="trip-events__item">
     <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createTypeListTemplate(allOffers)}
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${capitalizeFirstLetter(type)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(selectedDestinationName)}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
          <datalist id="destination-list-1">
            ${createDestionationsOptionsTemplate(allDestinations)}
          </datalist>
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${convertPointDateForEditForm(startDate)}" ${isDisabled ? 'disabled' : ''}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${convertPointDateForEditForm(endDate)}" ${isDisabled ? 'disabled' : ''}>
        </div>
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabledByDate(startDate, endDate) ? '' : 'disabled'} ${isSubmitDisabledByPrice(basePrice) ? '' : 'disabled'} ${isSubmitDisabledByDestinationName(selectedDestinationName, allDestinations) ? '' : 'disabled'} ${isDisabled ? 'disabled' : ''}> ${isSaving ? 'Saving...' : 'Save'}</button>
        <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${!point.id ? 'Cancel' : deletingPoint} </button>
        <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers ${!allOffersForType.length ? 'visually-hidden' : ''}">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
          ${createAvailableOptionsTemplate(offers, allOffersForType)}
          </div>
        </section>
        <section class="event__section  event__section--destination ${selectedDestinationData.description !== '' ? 'visually-hidden' : ''}">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${selectedDestinationData.description}</p>
          ${(!selectedDestinationData.pictures) ? '' : createPhotosListTemplate(selectedDestinationData.pictures)}
        </section>
      </section>
    </form>
    </li>`
  );
};
export default class PointEditView extends AbstractStatefulView {
  #allOffers = null;
  #allDestinations = null;
  #startDatepicker = null;
  #endDatepicker = null;

  constructor(point = NEW_POINT, allOffers, allDestinations) {

    super();
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;

    this._state = PointEditView.parsePointToState(point, this.#allOffers, this.#allDestinations);
    this.#setInnerHandlers();
    this.#setStartDatepicker();
    this.#setEndDatepicker();
  }

  get template() {
    return createPointEditTemplate(this._state, this.#allOffers, this.#allDestinations);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#startDatepicker) {
      this.#startDatepicker.destroy();
      this.#startDatepicker = null;
    }

    if (this.#endDatepicker) {
      this.#endDatepicker.destroy();
      this.#endDatepicker = null;
    }

  };

  reset = (point, allOffers, allDestinations) => {
    this.updateElement(
      PointEditView.parsePointToState(point, allOffers, allDestinations),
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setPointSaveHandler(this._callback.pointSave);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setPointRollUpHandler(this._callback.pointRollUp);
    this.#setStartDatepicker();
    this.#setEndDatepicker();
  };

  setPointRollUpHandler = (callback) => {
    this._callback.pointRollUp = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#pointRollUpHandler);
  };

  setPointSaveHandler = (callback) => {
    this._callback.pointSave = callback;
    this.element.querySelector('form').addEventListener('submit', this.#pointSaveHandler);
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;

    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#pointDeleteHandler);
  };

  #setStartDatepicker = () => {
    this.#startDatepicker = flatpickr(
      this.element.querySelector('[name = "event-start-time"]'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        'time_24hr': true,
        onChange: this.#startDateChangeHandler,
      },
    );
  };

  #setEndDatepicker = () => {
    const refDate = dayjs(this._state.startDate).subtract(1, 'days');

    this.#endDatepicker = flatpickr(
      this.element.querySelector('[name = "event-end-time"]'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        'time_24hr': true,
        onChange: this.#endDateChangeHandler,
        disable: [
          function(date) {
            return date <= refDate;
          }
        ]
      },
    );
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationToggleHandler);
    this.element.querySelector('.event__type-group').addEventListener('click', this.#typeToggleHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerToggleHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceToggleHandler);
  };

  #pointRollUpHandler = (evt) => {
    evt.preventDefault();
    this._callback.pointRollUp();
  };

  #pointSaveHandler = (evt) => {
    evt.preventDefault();

    this._callback.pointSave(PointEditView.parseStateToPoint(this._state, this.#allDestinations));
  };

  #pointDeleteHandler = (evt) => {
    evt.preventDefault();

    this._callback.deleteClick(PointEditView.parseStateToPoint(this._state, this.#allDestinations));
  };

  #destinationToggleHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      selectedDestinationName: evt.target.value,
    });

  };

  #typeToggleHandler = (evt) => {
    if (!evt.target.matches('input[name=event-type]')) {
      return;
    }

    const typeValue = evt.target.value;

    evt.preventDefault();

    this.updateElement({
      type: typeValue,
      offers: [],
      availableOffersId: this.#allOffers.find((item) => (item.type === typeValue)).offers
    });
  };

  #offerToggleHandler = (evt) => {
    evt.preventDefault();

    const selectedOffers = [...this._state.offers];
    const clickedOfferId = parseInt(evt.target.id.match(/\d+/), 10);

    if (evt.target.checked) {
      selectedOffers.push(clickedOfferId);
    } else {
      selectedOffers.splice(selectedOffers.indexOf(clickedOfferId), 1);
    }

    this.updateElement({
      offers: selectedOffers,
    });
  };

  #priceToggleHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      basePrice: parseInt(evt.target.value, 10)
    });
  };

  #startDateChangeHandler = ([userStartDate]) => {
    this.updateElement({
      startDate: dayjs(userStartDate),
    });
  };

  #endDateChangeHandler = ([userEndDate]) => {
    this.updateElement({
      endDate: dayjs(userEndDate),
    });
  };


  static parsePointToState = (point, allOffers, allDestinations) => ({...point,
    selectedDestinationName: allDestinations.find((item) => (item.id === point.destination)).name,
    availableOffersId: allOffers.find((item) => (item.type === point.type)).offers,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });

  static parseStateToPoint = (state, allDestinations) => {
    const point = {...state};
    point.destination = allDestinations.find((item) => (item.name === point.selectedDestinationName)).id;

    delete point.selectedDestinationName;
    delete point.availableOffersId;
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  };

}
