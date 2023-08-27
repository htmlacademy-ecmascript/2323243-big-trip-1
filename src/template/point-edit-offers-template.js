function createOffersList(point, pointOffers, { type }) {
  return (
    pointOffers.find((el) => el.type === type).offers.map((offer) => /* html */
      `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden"
      id="event-offer-luggage-${offer.id}" type="checkbox"
      name="event-offer-${offer.title}"
      data-offer-id="${offer.id}"
      ${point.offers.find((id) => id === offer.id) === offer.id ? 'checked' : ''}
      >
      <label class="event__offer-label" for="event-offer-luggage-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
    )
  ).join(' ');

}

export { createOffersList };
