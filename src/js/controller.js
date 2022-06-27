const btnOpenEl = document.querySelector('.btn--open');
const btnCloseEl = document.querySelector('.btn--close');
const dialogAddNewTaskEl = document.querySelector('.dialog--new-task');
const dialogTextDesEl = document.querySelector('.dialog__text--description');
const dialogTextCatEl = document.querySelector('.dialog__text--category');
const tasksListIncompleteEl = document.querySelector(
  '.tasks__list--incomplete'
);
const btnPrincipalEl = document.querySelector('.btn--principal');

// ✨ Features:
// 1. Be able to add new elements to a list
// 2. Be able to remove existing elements from a list
// 3. Be able to rename existing elements in a list
// 4. Be able to see the number of complete and incomplete elements

// Solving Problem Framework:
// a. Make sure you 100% understand the problem. Ask the right questions to get a clear picture of the problem.
// b. Divide and conquer: Break a big problem into smaller sub-problems (task list).
// 1. Be able to add new elements to a list
// 1.1. Open and closing the dialog with the btn.
const cleanInputFields = () => {
  dialogTextDesEl.value = '';
  dialogTextCatEl.value = '';
};

const dialog = () => {
  btnOpenEl.addEventListener('click', () => {
    dialogAddNewTaskEl.showModal();
    cleanInputFields();
  });
  btnCloseEl.addEventListener('click', () => {
    dialogAddNewTaskEl.close();
  });
  dialogAddNewTaskEl.addEventListener('click', e => {
    const dialogRect = dialogAddNewTaskEl.getBoundingClientRect();
    const checkClickInsideDialog =
      e.clientY >= dialogRect.top &&
      e.clientY <= dialogRect.top + dialogRect.height &&
      e.clientX >= dialogRect.left &&
      e.clientX <= dialogRect.left + dialogRect.width;
    if (!checkClickInsideDialog) dialogAddNewTaskEl.close();
  });
};
dialog();

// 1.2 Render the new task to the task list
const renderTask = () => {
  const html = `
    <div class="tasks__item">
      <input
        class="tasks__checkbox"
        type="checkbox"
        id="${dialogTextDesEl.value}"
      />
      <div class="tasks__description">
        <label class="tasks__label" for="${dialogTextDesEl.value}">${dialogTextDesEl.value}</label>
        <p class="tasks__category">${dialogTextCatEl.value}</p>
      </div>
    </div>
  `;
  tasksListIncompleteEl.insertAdjacentHTML('afterbegin', html);
  dialogAddNewTaskEl.close();
};
btnPrincipalEl.addEventListener('click', renderTask);

// 1.3. Store the values on variables.
// 1.4. Then we clicked the button add and we render the new tasks__item at the top of the tasks__list.

// c. Only if you can't figure out the solution in your own, do as much research as you have to (google, stack overflow, mdn, etc).
// d. For bigger problems, write pseudo-code before writing the actual code.
