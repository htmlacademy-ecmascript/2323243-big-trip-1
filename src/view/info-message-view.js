import AbstractView from '../framework/view/abstract-view.js';

const createInfoMessageTemplate = (errorMessage) => (
  `<p class="trip-events__msg">${errorMessage}</p>`
);

export default class InfoMessageView extends AbstractView {
  #errorMessage = '';

  constructor(errorMessage) {
    super();
    this.#errorMessage = errorMessage;
  }

  get template() {
    return createInfoMessageTemplate(this.#errorMessage);
  }

}
