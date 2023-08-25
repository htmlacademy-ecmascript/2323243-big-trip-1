function createOffersList(allOffers, { type }) {
  return (
    allOffers.find((el) => el.type === type).offers.map((offer) => /* html */
      `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
      <label class="event__offer-label" for="event-offer-luggage-1">
        <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
    )
  ).join(' ');

}

export { createOffersList };
