function createPicturiesOfDestination(pictures) {
  return (
    pictures.map((image) => /*html*/ `<img class="event__photo" src="${image.src}" alt="${image.description}">`));
}

function createDistinationsList(pointDestination) {
  if (pointDestination) {
    const { description, pictures } = pointDestination;
    return (`
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
        ${createPicturiesOfDestination(pictures)}
        </div>
      </div>
    </section>`);
  }
  return '';
}

export { createDistinationsList };
