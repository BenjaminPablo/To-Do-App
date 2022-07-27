import View from './View.js';
import icons from '../../img/svg/sprite.svg';

class IncompleteTaskView extends View {
  _parentEl = document.querySelector('.tasks__heading');
  _message = `You've completed your daily tasks! You can take a break!`;

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
        />
        <label class="tasks__label">
          <span class="tasks__description">${
            task.description[0].toUpperCase() + task.description.slice(1)
          }</span>
          <span class="tasks__category">${task.category}</span>
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

export default new IncompleteTaskView();
