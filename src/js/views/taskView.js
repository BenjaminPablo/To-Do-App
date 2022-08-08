import View from './View';
import icons from '../../img/svg/sprite.svg';

class TaskView extends View {
  _parentEl = document.querySelectorAll('.tasks__item');

  addHandlerOnLoad(handler) {
    window.addEventListener('load', handler(this._getTaskValues()));
  }

  // Get the values from the DOM
  _getTaskValues() {
    return Array.from(this._parentEl).reduce(
      (acc, task) => {
        const des = task.querySelector('.tasks__description').textContent;
        const cat = task.querySelector('.tasks__category')?.textContent;
        const status = task.dataset.status;
        // For each status property, we add a new obj
        acc[status].push({
          description: des,
          // This adds a new category property if it exists in the DOM
          ...(cat && {
            category: cat,
          }),
          status: status,
        });
        return acc;
      },
      { incompleted: [], completed: [] }
    );
  }

  _generateMarkup() {
    const test = Object.values(this._data)
      .flat()
      .reduce(this._generateMarkupTaskOnLoad, []);
  }

  _generateMarkupTaskOnLoad(acc, task) {
    const status = task.status === 'incompleted';
    // acc.push(
    //   document.querySelector(`.tasks--${status ? 'incompleted' : 'completed'}`)
    // );
    let str;
    str += `
      <li class="tasks__item" tabindex="0" data-status="${
        status ? 'incompleted' : 'completed'
      }">
        <input
          class="tasks__checkbox"
          type="checkbox"
          aria-label="checkbox" ${!status ? 'checked disabled' : ''}
        />
        ${
          !status
            ? `<span class="tasks__description">${task.description}</span>`
            : `<label class="tasks__label">
              <span class="tasks__description">
                ${task.description}
              </span>
              <span class="tasks__category">${task.category}</span>
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
    acc.push(str);
    return acc;
  }
}

export default new TaskView();
