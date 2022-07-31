import View from './View';
import icons from '../../img/svg/sprite.svg';

class TaskView extends View {
  _tasksIncompletedEl = Array.from(document.querySelectorAll('.tasks__label'));
  _tasksCompletedEl = Array.from(
    document.querySelectorAll('.tasks--completed .tasks__description')
  );
  _tasksItemEl = document.querySelectorAll('.tasks__item');

  addHandlerSortTasks(handler) {
    const tasks = this._getTaskValues();
    window.addEventListener('load', function () {
      handler(tasks);
    });
  }

  _getTaskValues() {
    const inTask = this._tasksIncompletedEl.map(task => {
      let description, category;
      Array.from(task.children).forEach(task =>
        task.className === 'tasks__description'
          ? (description = task.textContent)
          : (category = task.textContent)
      );

      return { description, category };
    });
    const coTask = this._tasksCompletedEl.map(task => {
      const description = task.textContent;
      return { description };
    });
    return [inTask, coTask];
  }

  renderTask(data) {
    this._tasksItemEl.forEach(task => task.remove());
    data.map(task =>
      task.forEach(t => {
        const parentEl = document.querySelector(
          `.tasks--${!t.category ? 'completed' : 'incompleted'}`
        );
        const markup = `
        <li class="tasks__item" tabindex="0">
          <input
            class="tasks__checkbox"
            type="checkbox"
            aria-label="checkbox"
            ${!t.category ? 'checked disabled' : ''}
          />
          ${
            !t.category
              ? `<span class="tasks__description">${t.description}</span>`
              : `<label class="tasks__label">
                <span class="tasks__description">
                  ${t.description}
                </span>
                <span class="tasks__category">${t.category}</span>
              </label>`
          }

          <div class="options">
            <button
              class="btn btn--options"
              aria-label="Button to open a set of options"
              title="Button options"
            >
              <svg class="btn__icon btn__icon--options-task">
                <use
                href="${icons}#icon-dots-three-horizontal"
              ></use>
              </svg>
            </button>
            <div class="options__list hidden">
              <button class="btn btn--delete">Delete task</button>
            </div>
          </div>
        </li>`;
        parentEl.insertAdjacentHTML('beforeend', markup);
      })
    );
  }
}

export default new TaskView();
