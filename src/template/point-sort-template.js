function getSortItem(sortItem) {
  return (/* html */`
    <div class="trip-sort__item  trip-sort__item--${sortItem.type}">
      <input id="sort-${sortItem.type}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${sortItem.type}"
        data-sort-type="${sortItem.type}"
        ${(sortItem.isChecked) ? 'checked' : ''}
        ${(sortItem.isDisabled) ? 'disabled' : ''}
      >
      <label
        class="trip-sort__btn"
        for="sort-${sortItem.type}">
        ${sortItem.type}
      </label>
  </div>
  `);
}


function createSortTemplate({ sortMap }) {
  return (/* html */`
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        ${sortMap.map((sortItem) => getSortItem(sortItem)).join('')}
    </form>
  `);
}

export { createSortTemplate };
