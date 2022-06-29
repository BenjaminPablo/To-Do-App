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
const inputTextsEl = document.querySelectorAll('.input-text');
const inputTextDesEl = document.querySelector('.input-text--description');
const inputTextCatEl = document.querySelector('.input-text--category');
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
      inputTextDesEl.value === '' &&
      inputTextCatEl.value === ''
    ) {
      e.preventDefault();
    } else if (e.key === 'Enter' && inputTextDesEl.value !== '') {
      e.preventDefault();
    } else if (e.key === 'Enter' && inputTextCatEl.value !== '') {
      e.preventDefault();
    }
    // If we have pressed the enter already and we want to press it with both of the inputs filled, we remove the event listener for it to work
    else if (inputTextDesEl.value !== '' && inputTextCatEl.value !== '') {
      dialogAddNewTaskEl.removeEventListener('keydown', validateEnterTask);
    }
  };

  btnOpenEl.addEventListener('click', () => {
    dialogAddNewTaskEl.showModal();
    // Doing a foreach because i want to clean both of the inputs before opening the dialog
    inputTextsEl.forEach(dialText => (dialText.value = ''));
    // I put this event handler here so the validation can start right away.
    dialogAddNewTaskEl.addEventListener('keydown', validateEnterTask);
  });

  // All the ways to close the dialogs
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
      // Checks if the inputs are empty, if they are, then we return until the user fills the inputs.
      if (inputTextCatEl.value === '' || inputTextDesEl.value === '') return;

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
            inputTextDesEl.value[0].toUpperCase() +
            inputTextDesEl.value.slice(1).toLowerCase()
          }
          </label>
          <p class="tasks__category">${
            inputTextCatEl.value[0].toUpperCase() +
            inputTextCatEl.value.slice(1).toLowerCase()
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

      // Inserting the html
      tasksListIncompleteEl.insertAdjacentHTML('afterbegin', markup);
      // Closing the dialog after adding the task and open the success dialog
      dialogAddNewTaskEl.close();
      // Showing the dialog success
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
    const btnDelete = e.target.closest('.btn--delete');

    if (!btnDelete) return;
    dialogConfirmationEl.showModal();

    btnDeleteEl.addEventListener('click', () => {
      // 2.2 Delete the task
      btnDelete.parentElement.remove();
      // Then we close the confirmation dialog
      dialogConfirmationEl.close();

      // Check if this dialog is already open, if it's not, then we show it.
      if (!dialogSuccessTaskDeletedEl.hasAttribute('open'))
        dialogSuccessTaskDeletedEl.showModal();
    });
  });
};
deleteTask();

// // 3. Be able to rename existing elements in a list
// const renameTask = () => {
//   // 3.1. Replace the label with a new input field by double clicking the label, of course, to edit it.
//   tasksListIncompleteEl.addEventListener('dblclick', e => {
//     const taskLabel = e.target.closest('.tasks__label');
//     const taskCategory = e.target.closest('.tasks__category');

//     if (!taskLabel && !taskCategory) return;

//     const newInput = document.createElement('input');
//     newInput.classList.add('input-text');

//     // We assign the value of the task label to the new input
//     newInput.value = taskLabel.textContent;
//     // Then, we replace the task label with the new input whenever the user double clicks the label.
//     taskLabel.replaceWith(newInput);
//     newInput.focus();

//     // I chose the blur event because it was only the new input which was going to change, so there wasn't any need to bubble up.
//     newInput.addEventListener('blur', function () {
//       // So, if we lose the focus on the input, we replace it with the label that was preceding it.
//       this.replaceWith(taskLabel);
//     });

//     // newInput.addEventListener('keydown', function (e) {
//     //   // We first check that they we pressed is not enter neither escape, if that happens, then we inmediately return.
//     //   // if (!e.key === 'Enter' && !e.key === 'Escape') return;
//     //   // If we just hit escape, we do replace the input with the label, but with any changes at all.
//     //   if (e.key === 'Escape') this.replaceWith(taskLabel);
//     //   // If we hit enter, whatever value we put in the new input, is going to be assigned to the tasklabel, even if we didn't do any changes at all.
//     //   if (e.key === 'Enter') {
//     //     taskLabel.textContent = this.value;
//     //     this.replaceWith(taskLabel);
//     //   }
//     // });
//   });
// };
// renameTask();

// 4. Be able to see the number of complete and incomplete elements
