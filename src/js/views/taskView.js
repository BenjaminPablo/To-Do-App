import View from './View';
import icons from '../../img/svg/sprite.svg';

class TaskView extends View {
  _parentEl = Array.from(document.querySelectorAll('.tasks__item'));

  addHandlerOnLoad(handler) {
    const tasks = this._getTaskValues();
    window.addEventListener('load', function () {
      handler(tasks);
    });
  }

  _getTaskValues() {
    let inTasks = [],
      coTasks = [];
    this._parentEl.map(task =>
      task.dataset.status === 'incompleted'
        ? inTasks.push({
            description: task.querySelector('.tasks__description').textContent,
            category: task.querySelector('.tasks__category').textContent,
            status: task.dataset.status,
          })
        : coTasks.push({
            description: task.querySelector('.tasks__description').textContent,
            status: task.dataset.status,
          })
    );
    return [inTasks, coTasks];
  }

  _generateMarkup() {
    // Cleaning the html before inserting the new data
    this._parentEl.forEach(task => task.remove());
    const test = this._data.map(task => {
      const test1 = task.map(this._generateMarkupTaskOnLoad).map(task => {
        console.log(task);
        task.reduce((acc, cur) => {
          console.log(cur);
        }, {});
      });
      // console.log(test1);
    });

    // console.log(test);
  }

  _generateMarkupTaskOnLoad(t) {
    const status = t.status === 'incompleted';
    const parentEl = document.querySelector(
      `.tasks--${status ? 'incompleted' : 'completed'}`
    );
    const markup = `
      <li class="tasks__item" tabindex="0" data-status="${
        status ? 'incompleted' : 'completed'
      }">
        <input
          class="tasks__checkbox"
          type="checkbox"
          aria-label="checkbox"
          ${!status ? 'checked disabled' : ''}
        />
        ${
          !status
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
    return [markup, parentEl];
  }
}

export default new TaskView();
