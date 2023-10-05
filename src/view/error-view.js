import AbstractView from '../framework/view/abstract-view.js';

const createEmptyListTemplate = () => (
  '<p class="trip-events__msg"> Server is temporary unavailable </p>'
);

export default class EmptyListView extends AbstractView {

  constructor() {
    super();
  }

  get template() {
    return createEmptyListTemplate();
  }

}
