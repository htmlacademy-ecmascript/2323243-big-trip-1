function createTyItem(types) {
  return types.map((type, index) => /* html */ `
    <div class="event__type-item">
      <input id="event-type-${type}-${index}"
      class="event__type-input  visually-hidden"
      type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}"
      for="event-type-${type}-${index}">
      ${type}
      </label>
    </div>
  `).join(' ');
}

function createTypeList({ type }, types) {
  return (/* html */`
      <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${createTyItem(types)}
        </fieldset>
      </div>
    </div>
  `);
}

export { createTypeList };
