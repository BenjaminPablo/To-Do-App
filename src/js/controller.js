import { random } from 'lodash';
const icons = require('../img/svg/sprite.svg');

const btnOpenEl = document.querySelector('.btn--open');
const btnsCloseEl = document.querySelectorAll('[data-value="close"]');
const btnDeleteEl = document.querySelector(
  '.btn--secondary[data-value="delete"]'
);
const dialogsEl = document.querySelectorAll('.dialog');
const dialogAddNewTaskEl = document.querySelector('.dialog--new-task');
const dialogSuccessTaskAddedEl = document.querySelector(
  '.dialog--success[data-value="task-added"]'
);
const dialogSuccessTaskDeletedEl = document.querySelector(
  '.dialog--success[data-value="task-deleted"]'
);
const dialogConfirmationEl = document.querySelector('.dialog--confirmation');
const dialogTextsEl = document.querySelectorAll('.dialog__text');
const dialogTextDesEl = document.querySelector('.dialog__text--description');
const dialogTextCatEl = document.querySelector('.dialog__text--category');
const tasksListIncompleteEl = document.querySelector(
  '.tasks__list--incomplete'
);
const btnAddNewTaskEl = document.querySelector('[data-des="add-new-task"]');
const sectionTasksEl = document.querySelector('.section-tasks');

// ✨ Features:
// 1. Be able to add new elements to a list
// 1.1. Open and closing the dialog with the btn.
const addNewTask = () => {
  const validateEnterTask = e => {
    // 1.2. Validade all the wrong input fills scenarios
    // This functions checks if:
    // 1. The user presses the Enter button and the two inputs are empty.
    // 2. The user fills one input but no the other one and presses the key enter
    // 3. The user filled all the inputs correctly
    if (
      e.key === 'Enter' &&
      dialogTextDesEl.value === '' &&
      dialogTextCatEl.value === ''
    ) {
      e.preventDefault();
    } else if (e.key === 'Enter' && dialogTextDesEl.value !== '') {
      e.preventDefault();
    } else if (e.key === 'Enter' && dialogTextCatEl.value !== '') {
      e.preventDefault();
    } else if (dialogTextDesEl.value !== '' && dialogTextCatEl.value !== '') {
      dialogAddNewTaskEl.removeEventListener('keydown', validateEnterTask);
    }
  };

  btnOpenEl.addEventListener('click', () => {
    dialogAddNewTaskEl.showModal();
    dialogTextsEl.forEach(dialText => (dialText.value = ''));
    // I put this event handler here so the validation can start right away.
    dialogAddNewTaskEl.addEventListener('keydown', validateEnterTask);
  });

  // All the ways to close the dialog-new-task
  dialogsEl.forEach(dialog => {
    btnsCloseEl.forEach(btnClose =>
      btnClose.addEventListener('click', () => dialog.close())
    );

    dialog.addEventListener('click', e => {
      const dialogRect = dialog.getBoundingClientRect();
      const checkClickInsideDialog =
        e.clientY >= dialogRect.top &&
        e.clientY <= dialogRect.top + dialogRect.height &&
        e.clientX >= dialogRect.left &&
        e.clientX <= dialogRect.left + dialogRect.width;
      if (!checkClickInsideDialog) dialog.close();
    });
  });

  // 1.2 Render the new task to the incomplete task list each time the add-new-task button is clicked
  const renderNewTask = () => {
    // Function to format the value input to the first letter to be uppercase
    const randomID = Math.floor(Math.random() * 10000);
    const insertTask = () => {
      // Formatting the values and adding the randomid in the html
      const markup = `
      <div class="tasks__item">
        <input
          class="tasks__checkbox"
          type="checkbox"
          id="${randomID}"
        />
        <div class="tasks__description">
          <label class="tasks__label">
          ${
            dialogTextDesEl.value[0].toUpperCase() +
            dialogTextDesEl.value.slice(1).toLowerCase()
          }
          </label>
          <p class="tasks__category">${
            dialogTextCatEl.value[0].toUpperCase() +
            dialogTextCatEl.value.slice(1).toLowerCase()
          }</p>
          </div>
          <button
            class="btn btn--delete"
            aria-label="Remove task item"
            title="Remove task item"
            >
            <svg class="btn__icon btn__icon--delete">
            <use href="${icons}#icon-trashcan"></use>
            </svg>
            </button>
      </div>
    `;

      // Checks if before clicking the add a new task button the inputs are empty, if they are, then we return the action until the user fills the inputs.
      if (dialogTextCatEl.value === '' || dialogTextDesEl.value === '') {
        return;
      }

      // Inserting the html
      tasksListIncompleteEl.insertAdjacentHTML('afterbegin', markup);
      // Closing the dialog after adding the task and open the success dialog
      dialogAddNewTaskEl.close();
      dialogSuccessTaskAddedEl.showModal();
    };
    btnAddNewTaskEl.addEventListener('click', insertTask);
  };
  renderNewTask();
};
addNewTask();

// 2. Be able to remove existing elements from a list
// 2.1 Add event handler to the delete button to show the dialog of confirmation to delete the task.
const deleteTask = () => {
  sectionTasksEl.addEventListener('click', e => {
    const closestButtonDelete = e.target.closest('.btn--delete');

    if (!closestButtonDelete) return;
    dialogConfirmationEl.showModal();
    btnDeleteEl.addEventListener('click', () => {
      // 2.2 Delete the task
      closestButtonDelete.parentElement.remove();
      // 2.3 Show a dialog of success for the user to know that the task has been deleted successfully
      dialogSuccessTaskDeletedEl.showModal();
    });
  });
};
deleteTask();

// 3. Be able to rename existing elements in a list
tasksListIncompleteEl.addEventListener('dblclick', e => {
  const taskLabel = e.target.closest('.tasks__label');

  if (!taskLabel) return;

  taskLabel.dataset.editorShown = true;

  const newInput = document.createElement('input');
  newInput.classList.add('dialog__text');
  newInput.value = taskLabel.textContent;

  taskLabel.replaceChild(newInput, taskLabel.firstChild);
  newInput.focus();
});
// const updateTaskLabel = e => {
//   const updatedText = document.createTextNode(e.target.value);
//   taskLabel.replaceChild(updatedText, e.target);
//   taskLabel.dataset.editorShown = false;
// };

tasksListIncompleteEl.addEventListener('click', e => {
  const notTaskLabel = !e.target.closest('.tasks__label');
  console.log(notTaskLabel);

  if (notTaskLabel) return;
});
// tasksListIncompleteEl.addEventListener('focusout', updateTaskLabel);

// tasksListIncompleteEl.addEventListener('click', e => {
//   const taskLabel = e.target.closest('.tasks__label');
//   const taskDescription = taskLabel.parentElement;

//   if (!taskLabel && !taskDescription) return;

//   taskLabel.addEventListener('click', () => {
//     const newInput = document.createElement('input');
//     newInput.classList.add('dialog__text');
//     newInput.value = taskLabel.textContent;

//     taskDescription.replaceChild(newInput, taskLabel);
//     newInput.focus();
//   });
// });
// 4. Be able to see the number of complete and incomplete elements
