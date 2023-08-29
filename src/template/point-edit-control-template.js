import { EditType } from '../const.js';

const ButtonLabel = {
  [EditType.EDITING]: 'Delete',
  [EditType.CREATING]: 'Cancel'
};

function createDeleteButtonTemplate({ type }) {
  return `<button class="event__reset-btn" type="reset">${ButtonLabel[type]}</button>`;
}

function createRollupButtonTemplate() {
  return `<button class="event__rollup-btn"
  type="button">
  <span class="visually-hidden">Open event</span>
  </button>`;
}

function createPointEditControlsTemplate({ typeButton: type }) {
  return `
    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    ${createDeleteButtonTemplate({ type })}
    ${(type !== EditType.CREATING) ? createRollupButtonTemplate() : ''}
    `;
}

export { createPointEditControlsTemplate };
