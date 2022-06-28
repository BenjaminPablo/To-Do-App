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
    // Checks if the user presses the enter button and if the inputs are empty, if all is true, then we block the enter key until the user fills boths inputs
    if (
      (e.key !== 'Escape' &&
        e.key === 'Enter' &&
        dialogTextDesEl.value === '') ||
      dialogTextCatEl.value === ''
    ) {
      e.preventDefault();
    }
  };

  btnOpenEl.addEventListener('click', () => {
    dialogAddNewTaskEl.showModal();
    dialogTextsEl.forEach(dialText => (dialText.value = ''));
    // I put this event handler here so it can work inmediately after we open the dialog.
    dialogAddNewTaskEl.addEventListener('keydown', validateEnterTask);
  });

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

// 1.2 Render the new task to the task list
const renderNewTask = () => {
  const randomIDGenerator = Math.floor(Math.random() * 10000);
  const inputsTextFormat = inputs => {
    inputs.forEach(input => input[0].toUpperCase() + input.slice(1));
  };

  const insertTask = () => {
    const randomID = randomIDGenerator;
    const markup = `
      <div class="tasks__item">
        <input
          class="tasks__checkbox"
          type="checkbox"
          id="${randomID}"
        />
        <div class="tasks__description">
          <label class="tasks__label" for="${randomID}">
          ${dialogTextDesEl.value}
          </label>
          <p class="tasks__category">${dialogTextCatEl.value}</p>
          </div>
      </div>
    `;

    // Adding the values inside the function inputTextFormat to format the first letter to uppercase and the rest as it is.
    // inputsTextFormat(dialogTextsEl);

    // Checks if before clicking the add a new task button the inputs are empty, if they are, then we return the action until the user fills the inputs.
    dialogAddNewTaskEl.addEventListener('keydown', validateEnterTask);

    tasksListIncompleteEl.insertAdjacentHTML('afterbegin', markup);
    dialogAddNewTaskEl.close();
    dialogSuccessEl.showModal();
  };
  btnAddNewTaskEl.addEventListener('click', insertTask);
};
renderNewTask();

// 2. Be able to remove existing elements from a list
// 3. Be able to rename existing elements in a list
// 4. Be able to see the number of complete and incomplete elements
