function createDistinationsImages(image) {
  return (/* html */`
      <img class="event__photo" src="${image.src}" alt="${image.description}">
`);
}

function createDistinationsList(pointDestination, { destination }) {
  return (/* html */`
    <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${pointDestination.find((elem) => elem.id === destination).description}.</p>
        <div class="event__photos-container">
            <div class="event__photos-tape">
                ${pointDestination.find((elem) => elem.id === destination).pictures.map((image) => createDistinationsImages(image)).join()}
            </div>
        </div>
     </section>
     `);
}

export { createDistinationsList };
