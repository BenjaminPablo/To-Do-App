const btnOpenEl = document.querySelector('.btn--open');
const btnCloseEl = document.querySelector('.btn--close');
const modalGroupEl = document.querySelector('.modal__group');
const modalOverlayEl = document.querySelector('.modal__overlay');

// ✨ Features:
// 1. Be able to add new elements to a list
// 2. Be able to remove existing elements from a list
// 3. Be able to rename existing elements in a list
// 4. Be able to see the number of complete and incomplete elements

// Solving Problem Framework:
// a. Make sure you 100% understand the problem. Ask the right questions to get a clear picture of the problem.
// b. Divide and conquer: Break a big problem into smaller sub-problems (task list).
// 1. Be able to add new elements to a list
// 1.1. Add a event listener to the btnOpen and btnClose.
// 1.2. When the btn is clicked we render a modal window and fill the description and category.
btnOpenEl.addEventListener('click', () => {
  modalOverlayEl.classList.remove('hidden');
  modalGroupEl.classList.remove('hidden');
});

btnCloseEl.addEventListener('click', () => {
  modalOverlayEl.classList.add('hidden');
  modalGroupEl.classList.add('hidden');
});

modalOverlayEl.addEventListener('click', () => {
  modalOverlayEl.classList.add('hidden');
  modalGroupEl.classList.add('hidden');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modalGroupEl.classList.contains('hidden')) {
    modalOverlayEl.classList.add('hidden');
    modalGroupEl.classList.add('hidden');
  }
});

// 1.3. Store the values on variables.
// 1.4. Then we clicked the button add and we render the new tasks__item at the top of the tasks__list.

// c. Only if you can't figure out the solution in your own, do as much research as you have to (google, stack overflow, mdn, etc).
// d. For bigger problems, write pseudo-code before writing the actual code.
