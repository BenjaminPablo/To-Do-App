import icons from '../img/svg/sprite.svg';

// Header component
const headerStatusChildrenEl = Array.from(
  document.querySelector('.header__status').children
);
const headerCounterIncompletedEl = document.querySelector(
  '.header__incompleted'
);
// Tasks Component
const tasksHeadingEl = document.querySelector('.tasks__heading');
// Buttons
const btnRenderTaskFormEl = document.querySelector('.btn--render-task-form');
const btnSubmitEl = document.querySelector('.btn--submit');
const btnCancelEl = document.querySelector('.btn--cancel');
// Form
const formEl = document.querySelector('.form');
const formTextEl = document.querySelector('.form__text');
const formSelectEl = document.querySelector('.form__select');

class App {
  // We set the text content to both header status children
  #counterTasksIncompleted = 5;
  #counterTasksCompleted = 5;

  constructor() {
    // Counters for header__status
    headerStatusChildrenEl.forEach(
      headerStatus => (headerStatus.textContent = 5)
    );

    btnRenderTaskFormEl.addEventListener('click', this.#renderNewTaskForm);
  }

  #renderNewTaskForm() {
    formEl.classList.remove('hidden');
    btnRenderTaskFormEl.classList.add('hidden');
    formTextEl.focus();
  }

  #renderNewTask() {}

  #showOptionsTask() {}

  #deleteTask() {}

  #confirmDelete() {}

  #editTask() {}

  #renderEditedTask() {}

  #addNewTag() {}

  #renderNewTag() {}

  #addNewList() {}

  #renderNewList() {}

  #showOptionsList() {}

  #selectMultipleTasks() {}
}

const app = new App();

// ✅ ✨ Features:
// ✅ 1. Be able to add new elements to a list
// 1.1. After finishing load
// showBtnRenderTaskForm();
// 1.2. Render task form

// 1.3 Validation and submit for keydown, only validating for the input event
// document.addEventListener('keydown', validateKeyTaskForm);
// formEl.addEventListener('input', activateBtnSubmit);
// // 1.4. Adding a new task
// btnSubmitEl.addEventListener('click', addNewTask);
// // Canceling the submit and replacing the form
// formEl.addEventListener('focusout', closeFormOnClick);
// btnCancelEl.addEventListener('click', showBtnRenderTaskForm);

// const p = document.createElement('p');
// const pCompleted = document.createElement('p');
// p.textContent = `You don't have any tasks for the moment to complete! 🎉`;
// pCompleted.textContent = `Your completed tasks are empty! 🎉`;

// Task 1 - Functions
// To disable the btnSubmit
const disableBtnSubmit = () => {
  btnSubmitEl.setAttribute('inert', '');
  btnSubmitEl.classList.add('u-opacity-0-5');
};

// To enable the btnSubmit
const enableBtnSubmit = () => {
  btnSubmitEl.removeAttribute('inert');
  btnSubmitEl.classList.remove('u-opacity-0-5');
};

const renderTaskForm = () => {};

const showBtnRenderTaskForm = e => {
  btnRenderTaskFormEl.focus();
  formEl.removeEventListener('focusout', closeFormOnClick);
  formEl.replaceWith(btnRenderTaskFormEl);
  restartForm();
  // if (!tasksHeadingEl.contains(btnRenderTaskFormEl)) {
  //   e.preventDefault();
  // }
  // Removes the focusevent so we don't have two events active, only one, focusout or click
};

const cleanInputValues = () => {
  formTextEl.value = '';
  formSelectEl.value = '';
};

const restartForm = () => {
  cleanInputValues();
  disableBtnSubmit();
};

const validateKeyTaskForm = e => {
  if (e.key === 'Escape') {
    // Checking if the user presses the Esc key in any time once the tasksForm is shown
    showBtnRenderTaskForm(e);
  }
  if (
    // If the form text is empty, then we stop the submit
    e.key === 'Enter' &&
    formTextEl.value === '' &&
    formTextEl === document.activeElement
  ) {
    e.preventDefault();
  }
  if (
    // If the user didn't choose any category, then we prevent the submit
    e.key === 'Enter' &&
    formSelectEl.value === '' &&
    formSelectEl !== document.activeElement &&
    btnCancelEl !== document.activeElement &&
    btnRenderTaskFormEl !== document.activeElement
  ) {
    e.preventDefault();
  }
  if (
    // If the text and select have been completed, then we add the new task to the incompleted list.
    e.key === 'Enter' &&
    formTextEl.value !== '' &&
    formSelectEl.value !== '' &&
    btnCancelEl !== document.activeElement
  ) {
    addNewTask(e);
    btnRenderTaskFormEl.focus();
  }
};

const formatInputValue = formEl =>
  formEl.value[0].toUpperCase() + formEl.value.slice(1).toLowerCase();

// To add a new task item to the incompleted tasks list
const addNewTask = e => {
  formEl.addEventListener('focusout', closeFormOnClick);
  // Formatting the values and adding the randomid in the html
  const randomID = Math.floor(Math.random() * 10000);
  const markup = `
    <fieldset class="tasks__item" data-status="incompleted" tabindex="0">
      <input
        class="tasks__checkbox"
        type="checkbox"
        aria-label="checkbox"
        id="${randomID}"
      />
      <label class="tasks__label">
        <span class="tasks__description">${formatInputValue(formTextEl)}</span>
        <span class="tasks__category">${formSelectEl.value}</span>
      </label>
      <button
        class="btn btn--delete"
        aria-label="Remove task item"
        title="Remove task item"
      >
        <svg class="btn__icon btn__icon--delete-task">
          <use href="src/img/svg/sprite.svg#icon-trashcan"></use>
        </svg>
      </button>
    </fieldset>`;

  // When adding a new item, the score of the one belonging to the list increases.
  counterTasksIncompleted++;
  headerCounterIncompletedEl.textContent = counterTasksIncompleted;
  // Inserting the html
  tasksHeadingEl.insertAdjacentHTML('afterend', markup);
  btnRenderTaskFormEl.focus();
  showBtnRenderTaskForm(e);
};

const activateBtnSubmit = () => {
  formSelectEl.value === '' || formTextEl.value === ''
    ? disableBtnSubmit()
    : enableBtnSubmit();
};

const closeFormOnClick = function (e) {
  if (e.relatedTarget !== null) return;
  this.replaceWith(btnRenderTaskFormEl);
  restartForm();
};

// // ✅ 2. Be able to remove existing elements from a list
// // 2.1 Add event handler to the delete button to show the dialog of confirmation to delete the task.
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

// // ✅ 3. Be able to rename existing elements in a list
// const renameTask = () => {
//   // // tasksDescriptionEl.forEach(task => {
//   //   // 3.1. Replace the label with a new input field by double clicking the label, of course, to edit it.
//   //   tasksIncompletedEl.addEventListener('dblclick', e => {
//   //     const taskDesChild = e.target.closest(`.${task.className}`);
//   //     if (!taskDesChild) return;
//   //     const newInput = document.createElement('input');
//   //     const typeChild =
//   //       task.className === 'tasks__label'
//   //         ? 'input-text__update--description'
//   //         : 'input-text__update--category';
//   //     newInput.classList.add('input-text', typeChild);
//   //     // We assign the value of the task label to the new input, and we also delete the spaces.
//   //     newInput.value = taskDesChild.textContent.trim();
//   //     // Then, we replace the task label with the new input whenever the user double clicks the label.
//   //     taskDesChild.replaceWith(newInput);
//   //     // newInput.setSelectionRange(0, 0);
//   //     newInput.focus();
//   //     const onFocus = function () {
//   //       // We delete the listener and the replace with each time so we can get a new replacewith method working
//   //       this.removeEventListener('blur', onFocus);
//   //       // So, if we lose the focus on the input, we replace it with the label that was preceding it.
//   //       this.replaceWith(taskDesChild);
//   //     };
//   //     newInput.addEventListener('blur', onFocus);
//   //     newInput.addEventListener('keydown', function (e) {
//   //       // If we just hit escape, we do replace the input with the label, but with any changes at all.
//   //       if (e.key === 'Escape') {
//   //         this.removeEventListener('blur', onFocus);
//   //         this.replaceWith(taskDesChild);
//   //       }
//   //       // Meanwhile we hit enter and the value is not empty, we can store that value to the task and display it
//   //       if (e.key === 'Enter' && this.value !== '') {
//   //         this.removeEventListener('blur', onFocus);
//   //         taskDesChild.textContent = this.value;
//   //         this.replaceWith(taskDesChild);
//   //       }
//   //     });
//   //   });
//   // });
// };
// renameTask();

// // ✅ 4. Be able to see the number of complete and incomplete elements
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
