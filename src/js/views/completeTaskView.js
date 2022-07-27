import View from './View.js';
import icons from '../../img/svg/sprite.svg';

class CompleteTaskView extends View {
  _parentEl = document.querySelector('.tasks--completed');
  _message = `Your complete tasks is cleaned!`;

  _generateMarkup() {
    return this._data.map(this._generateMarkupTask).join('');
  }

  _generateMarkupTask(task) {
    return `
      <li class="tasks__item" tabindex="0">
        <input
          class="tasks__checkbox"
          type="checkbox"
          aria-label="checkbox"
          checked
          disabled
        />
        <label class="tasks__description">
          ${task.description}
        </label>
        <button
          class="btn btn--delete"
          aria-label="Remove task item"
          title="Remove task item"
        >
          <svg class="btn__icon btn__icon--delete-task">
            <use href="${icons}#icon-trashcan"></use>
          </svg>
        </button>
      </li>`;
  }
}

export default new CompleteTaskView();
