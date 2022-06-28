const { random } = require('lodash');

const btnOpenEl = document.querySelector('.btn--open');
const btnsCloseEl = document.querySelectorAll('[data-des="close"]');
const dialogsEl = document.querySelectorAll('.dialog');
const dialogAddNewTaskEl = document.querySelector('.dialog--new-task');
const dialogTextEl = document.querySelectorAll('.dialog__text');
console.log(dialogTextEl);
const dialogSuccessEl = document.querySelector('.dialog--success');
const dialogTextDesValEl = document.querySelector(
  '.dialog__text--description'
).value;
const dialogTextCatValEl = document.querySelector(
  '.dialog__text--category'
).value;
const tasksListIncompleteEl = document.querySelector(
  '.tasks__list--incomplete'
);
const btnAddNewTaskEl = document.querySelector('[data-des="add-new-task"]');

// ✨ Features:
// 1. Be able to add new elements to a list
// 1.1. Open and closing the dialog with the btn.
const dialog = () => {
  btnOpenEl.addEventListener('click', () => {
    dialogAddNewTaskEl.showModal();
    dialogTextDesValEl = '';
    dialogTextCatValEl = '';
  });

  dialogsEl.forEach(dialog => {
    btnsCloseEl.forEach(btnClose => {
      btnClose.addEventListener('click', () => dialog.close());
    });

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
  const taskStringFormat = task => {};

  const insertTask = () => {
    const randomID = randomIDGenerator;
    const html = `
      <div class="tasks__item">
        <input
          class="tasks__checkbox"
          type="checkbox"
          id="${randomID}"
        />
        <div class="tasks__description">
          <label class="tasks__label" for="${randomID}">${dialogTextDesValEl}</label>
          <p class="tasks__category">${dialogTextCatValEl}</p>
        </div>
      </div>
    `;
    // Adding the values inside
    const dialogTexts = [dialogTextDesValEl, dialogTextCatValEl];
    taskStringFormat(dialogTexts);

    dialogAddNewTaskEl.addEventListener('keydown', e => {
      // Checks if the user presses the enter button and if the inputs are empty, if all is true, then we block the enter key until the user fills boths inputs
      if (
        e.key === 'Enter' &&
        dialogTextDesValEl.value === '' &&
        dialogTextCatValEl.value === ''
      ) {
        e.preventDefault();
      }
    });

    // Checks if before clicking the add a new task button the inputs are empty, if they are, then we return the action until the user fills the inputs.
    if (dialogTextDesValEl.value === '' && dialogTextCatValEl.value === '') {
      return;
    }

    tasksListIncompleteEl.insertAdjacentHTML('afterbegin', html);
    dialogAddNewTaskEl.close();
    dialogSuccessEl.showModal();
  };
  btnAddNewTaskEl.addEventListener('click', insertTask);
};
renderNewTask();

// 2. Be able to remove existing elements from a list
// 3. Be able to rename existing elements in a list
// 4. Be able to see the number of complete and incomplete elements
