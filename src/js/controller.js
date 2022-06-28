import { random } from 'lodash';

const btnOpenEl = document.querySelector('.btn--open');
const btnsCloseEl = document.querySelectorAll('[data-des="close"]');
const dialogsEl = document.querySelectorAll('.dialog');
const dialogAddNewTaskEl = document.querySelector('.dialog--new-task');
const dialogTextsEl = document.querySelectorAll('.dialog__text');
const dialogSuccessEl = document.querySelector('.dialog--success');
const dialogTextDesEl = document.querySelector('.dialog__text--description');
const dialogTextCatEl = document.querySelector('.dialog__text--category');
const tasksListIncompleteEl = document.querySelector(
  '.tasks__list--incomplete'
);
const btnAddNewTaskEl = document.querySelector('[data-des="add-new-task"]');

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
    // I put this event handler here so it can work inmediately after we open the dialog.
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
// 3. Be able to rename existing elements in a list
// 4. Be able to see the number of complete and incomplete elements
