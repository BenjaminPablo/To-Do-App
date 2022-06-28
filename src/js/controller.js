import { random } from 'lodash';

const btnOpenEl = document.querySelector('.btn--open');
const btnsCloseEl = document.querySelectorAll('[data-value="close"]');
const dialogsEl = document.querySelectorAll('.dialog');
const dialogAddNewTaskEl = document.querySelector('.dialog--new-task');
const dialogSuccessEl = document.querySelector('.dialog--success');
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
const dialog = () => {
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
};
dialog();

// 1.2 Render the new task to the incomplete task list each time the add-new-task button is clicked
const renderNewTask = () => {
  const insertTask = () => {
    // Function to format the value input to the first letter to be uppercase
    const randomIDGenerator = Math.floor(Math.random() * 10000);
    // Saving the random number to utilize it in two places at the same time
    const randomID = randomIDGenerator;

    // Formatting the values and adding the randomid in the html
    const markup = `
      <div class="tasks__item">
        <input
          class="tasks__checkbox"
          type="checkbox"
          id="${randomID}"
        />
        <div class="tasks__description">
          <label class="tasks__label" for="${randomID}">
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
          <button class="btn btn--delete">Delete</button>
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
    dialogSuccessEl.showModal();
  };
  btnAddNewTaskEl.addEventListener('click', insertTask);
};
renderNewTask();

// 2. Be able to remove existing elements from a list
// 2.1 Add event handler to the delete button to show the dialog of confirmation to delete the task.
btnsDeleteEl.addEventListener('click', e => {
  console.log(e.target);
});

// 2.2 If btn cancel is click the modal is closed and nothing happens
// 2.3 If btn delete is click, then close the modal and
// 2.4 Delete the task
// 2.5 Show a dialog of success for the user to know that the task has been deleted successfully

// 3. Be able to rename existing elements in a list
// 4. Be able to see the number of complete and incomplete elements
