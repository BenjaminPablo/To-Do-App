import icons from '../../img/svg/sprite.svg';
import View from './View.js';

class AddTaskView extends View {
  _parentEl = document.querySelector('.tasks--incompleted');
  _message = `You've completed your daily tasks! You can take a break!`;
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
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerNewTask(handler) {
    const self = this;
    this._formEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);

      handler(data);
      self._hideForm(e);
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

  renderTaskOnLoad(data) {
    data.map(task => {
      task.map(this._generateMarkupTask);
    });
  }

  _generateMarkupTask(t) {
    const curParentEl = document.querySelector(
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
            ? `<label class="tasks__description">
          ${t.description}
        </label>`
            : `<label class="tasks__label">
          <span class="tasks__description">${t.description}</span>
          <span class="tasks__category">${t.category}</span>
        </label>`
        }
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
    curParentEl.insertAdjacentHTML('beforeend', markup);
  }

  _generateMarkup() {
    return `
      <li class="tasks__item" tabindex="0">
        <input
        class="tasks__checkbox"
          type="checkbox"
          aria-label="checkbox"
        />
        <label class="tasks__label">
          <span class="tasks__description">${this._data.description}</span>
          <span class="tasks__category">${this._data.category}</span>
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

export default new AddTaskView();

// document.addEventListener('keydown', () => {
//   console.log(document.activeElement);
// });

// const p = document.createElement('p');
// const pCompleted = document.createElement('p');
// p.textContent = `You don't have any tasks for the moment to complete! 🎉`;
// pCompleted.textContent = `Your completed tasks are empty! 🎉`;

// ✅ 2. Be able to remove existing elements from a list
// 2.1 Add event handler to the delete button to show the dialog of confirmation to delete the task.
// const deleteTask = () => {
//   sectionTasksEl.addEventListener('click', e => {
//     const btnDelete = e.target.closest('.btn--delete');
//     if (!btnDelete) return;
//     const taskItem = btnDelete.parentElement;

//     dialogConfirmationEl.showModal();

//     btnDeleteEl.addEventListener('click', () => {
//       // 2.2 Delete the task
//       taskItem.remove();

//       if (counterTasksIncompleted < 1 && counterTasksCompleted < 1) {
//         tasksIncompletedEl.replaceWith(p);
//         tasksCompletedEl.replaceWith(pCompleted);
//       }
//       if (counterTasksIncompleted < 1) {
//         tasksIncompletedEl.replaceWith(p);
//       }
//       if (counterTasksCompleted < 1) tasksCompletedEl.replaceWith(pCompleted);

//       // Then we close the confirmation dialog
//       dialogConfirmationEl.close();
//       // Check if this dialog is already open, if it's not, then we show it.
//       if (!dialogSuccessTaskDeletedEl.hasAttribute('open'))
//         dialogSuccessTaskDeletedEl.showModal();
//     });

//     // When deleting an item, it decreases the counter of the item belonging to the list.
//     if (taskItem.dataset.status === 'incompleted') counterTasksIncompleted--;
//     else if (taskItem.dataset.status === 'completed') counterTasksCompleted--;

//     headerStatusIncompletedEl.textContent = counterTasksIncompleted;
//     headerStatusCompletedEl.textContent = counterTasksCompleted;
//   });
// };
// deleteTask();

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
