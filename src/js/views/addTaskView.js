import icons from '../../img/svg/sprite.svg';
import counterView from './counterView.js';
import View from './View.js';

class AddTaskView extends View {
  _parentEl = document.querySelector('.tasks--incompleted .tasks__list');
  _message = 'You have completed your daily tasks! You can take a break!';
  _formEl = document.querySelector('.form');
  _formTextEl = document.querySelector('.form__text');
  _formSelectEl = document.querySelector('.form__select');
  _btnOpenEl = document.querySelector('.btn--task-form');
  _btnSubmitEl = document.querySelector('.btn--submit');

  constructor() {
    super();
    this._btnOpenEl.addEventListener('click', this._showForm.bind(this));
    this._formEl.addEventListener('input', this._enableBtnSubmit.bind(this));
    this._formEl.addEventListener('focusout', this._hideForm.bind(this));
    document.addEventListener('keydown', this._hideForm.bind(this));
    this._parentEl.textContent = this._message;
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerNewTask(handler) {
    const self = this;
    this._formEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = new FormData(this);
      const data = Object.fromEntries(dataArr);
      handler(data);
      self._hideForm(e);
      counterView.increaseCounter();
    });
  }

  _showForm() {
    this._formTextEl.value = this._formSelectEl.value = '';
    this._formEl.classList.remove('hidden');
    this._btnOpenEl.classList.add('hidden');
    this._btnSubmitEl.setAttribute('inert', '');
    this._btnSubmitEl.classList.add('u-opacity-0-5');
    this._formTextEl.focus();
  }

  _hideForm(e) {
    if (
      e.relatedTarget === null ||
      e.type === 'submit' ||
      (e.key === 'Escape' && !this._formEl.classList.contains('hidden'))
    ) {
      this._formEl.classList.add('hidden');
      this._btnOpenEl.classList.remove('hidden');
      this._btnOpenEl.focus();
    }
  }

  _enableBtnSubmit() {
    if (this._formTextEl.value !== '' && this._formSelectEl.value !== '') {
      this._btnSubmitEl.removeAttribute('inert', '');
      this._btnSubmitEl.classList.remove('u-opacity-0-5');
    } else {
      this._btnSubmitEl.setAttribute('inert', '');
      this._btnSubmitEl.classList.add('u-opacity-0-5');
    }
  }

  _generateMarkup() {
    return this._data
      .map(
        task =>
          `
        <li class="tasks__item" tabindex="0" data-status="incompleted">
          <input
          class="tasks__checkbox"
            type="checkbox"
            aria-label="checkbox"
          />
          <label class="tasks__label">
            <span class="tasks__description">${task.description}</span>
            <span class="tasks__category">${task.category}</span>
          </label>
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
        </li>`
      )
      .join('');
  }
}

export default new AddTaskView();

// document.addEventListener('keydown', () => {
//   console.log(document.activeElement);
// });

// ✅ 3. Be able to rename existing elements in a list
// const renameTask = () => {
// // tasksDescriptionEl.forEach(task => {
//   // 3.1. Replace the label with a new input field by double clicking the label, of course, to edit it.
//   tasksIncompletedEl.addEventListener('dblclick', e => {
//     const taskDesChild = e.target.closest(`.${task.className}`);
//     if (!taskDesChild) return;
//     const newInput = document.createElement('input');
//     const typeChild =
//       task.className === 'tasks__label'
//         ? 'input-text__update--description'
//         : 'input-text__update--category';
//     newInput.classList.add('input-text', typeChild);
//     // We assign the value of the task label to the new input, and we also delete the spaces.
//     newInput.value = taskDesChild.textContent.trim();
//     // Then, we replace the task label with the new input whenever the user double clicks the label.
//     taskDesChild.replaceWith(newInput);
//     // newInput.setSelectionRange(0, 0);
//     newInput.focus();
//     const onFocus = function () {
//       // We delete the listener and the replace with each time so we can get a new replacewith method working
//       this.removeEventListener('blur', onFocus);
//       // So, if we lose the focus on the input, we replace it with the label that was preceding it.
//       this.replaceWith(taskDesChild);
//     };
//     newInput.addEventListener('blur', onFocus);
//     newInput.addEventListener('keydown', function (e) {
//       // If we just hit escape, we do replace the input with the label, but with any changes at all.
//       if (e.key === 'Escape') {
//         this.removeEventListener('blur', onFocus);
//         this.replaceWith(taskDesChild);
//       }
//       // Meanwhile we hit enter and the value is not empty, we can store that value to the task and display it
//       if (e.key === 'Enter' && this.value !== '') {
//         this.removeEventListener('blur', onFocus);
//         taskDesChild.textContent = this.value;
//         this.replaceWith(taskDesChild);
//       }
//     });
//   });
// });
// };
// renameTask();

// ✅ 4. Be able to see the number of complete and incomplete elements
// const updateNumberTasks = () => {
//   // 4.1. Add an event listener for all the incompleted tasks checkboxes
//   tasksIncompletedEl.addEventListener('click', e => {
//     const taskCheckbox = e.target.closest('.tasks__checkbox');
//     if (!taskCheckbox) return;
//     const taskItem = taskCheckbox.parentElement;
//     const taskDescription = taskItem.querySelector('.tasks__description');
//     // To select its children
//     const taskDesChildren = Array.from(taskDescription.children);

//     // First, if we check the checkbox, we increase the counter in the completed list and decrease it in the incompleted list
//     counterTasksIncompleted--;
//     counterTasksCompleted++;
//     pCompleted.replaceWith(tasksCompletedEl);

//     // Then, we disable and check the checkbox
//     taskCheckbox.disabled = true;
//     taskCheckbox.setAttribute('checked', '');
//     // We desactivate the label and category
//     taskDescription.classList.add('u-opacity-0-5');
//     taskDesChildren.forEach(child => (child.style.cursor = 'default'));
//     // Finally, we change the status of the dataset and remove the task item
//     taskItem.dataset.status = 'completed';
//     taskItem.remove();
//     // And we add it to the completed list
//     tasksCompletedEl.insertAdjacentHTML('afterbegin', taskItem.outerHTML);

//     if (counterTasksIncompleted < 1) {
//       counterTasksIncompleted = 0;
//       tasksIncompletedEl.replaceWith(p);
//     }

//     // And we update the counters.
//     headerStatusIncompletedEl.textContent = counterTasksIncompleted;
//     headerStatusCompletedEl.textContent = counterTasksCompleted;
//   });
// };
// updateNumberTasks();
