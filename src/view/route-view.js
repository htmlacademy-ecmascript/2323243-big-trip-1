import AbstractView from '../framework/view/abstract-view.js';

const createRouteTemplate = () => (
  '<section class="trip-events"></section>'
);

export default class RouteView extends AbstractView {

  get template() {
    return createRouteTemplate();
  }

}
