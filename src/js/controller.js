import icons from '../img/svg/sprite.svg';

let counterTasksIncompleted = 5;
let counterTasksCompleted = 5;
// headerStatusEl.forEach(headerStatus => (headerStatus.textContent = 5));

// const p = document.createElement('p');
// const pCompleted = document.createElement('p');
// p.textContent = `You don't have any tasks for the moment to complete! 🎉`;
// pCompleted.textContent = `Your completed tasks are empty! 🎉`;

const tasksHeadingEl = document.querySelector('.tasks__heading');

// Buttons
const btnRenderTaskFormEl = document.querySelector('.btn--render-task-form');
const btnSubmitEl = document.querySelector('.btn--submit');
const btnCancelEl = document.querySelector('.btn--cancel');

// Form
const formEl = document.querySelector('.form');
const formTextEl = document.querySelector('.form__text');

// ✅ ✨ Features:

// Function to disable any element
const disableEl = element => {
  element.setAttribute('inert', '');
  element.classList.add('u-opacity-0-5');
};

// ✅ 1. Be able to add new elements to a list
formEl.classList.add('u-display-none');

// 1.1. Add an event listener to the btnRenderTaskFormEl
btnRenderTaskFormEl.addEventListener('click', function (e) {
  // 1.1.1. Set focus on the formTextEl
  // 1.1.2. Hide the btnRenderTaskFormEl
  this.replaceWith(formEl);
  formEl.classList.remove('u-display-none');

  formTextEl.focus();
  // 1.1.3. Render the formEl
  // 1.1.4. Disable the btnSubmit until some text is typed
  disableEl(btnSubmitEl);
});

formEl.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    this.replaceWith(btnRenderTaskFormEl);
  }
});

formEl.addEventListener('click', function (e) {});

btnCancelEl.addEventListener('click', e => {
  e.preventDefault();
  formEl.replaceWith(btnRenderTaskFormEl);
});

// If the user clicks outside the new tasks__item or presses the esc key or clicks the btnCancelEl, then the taskFormEl disappears and the btnRenderTaskFormEl should appear.
// If the user presses the enter key without filling anything, it returns.
// If the user presses the enter key or clicks the btnSubmit after filling the input texts, then the taskFormEl is replaced with the button and it's added to the incompleted tasks. The counter for the incompleted tasks increases +1.

// const addNewTask = () => {
//   // To validate success and fail scenarios
//   const validateTaskForm = e => {
//     if (
//       e.key === 'Enter' &&
//       inputTextDesEl.value === '' &&
//       inputTextCatEl.value === ''
//     ) {
//       e.preventDefault();
//     } else if (e.key === 'Enter' && inputTextDesEl.value !== '') {
//       e.preventDefault();
//     } else if (e.key === 'Enter' && inputTextCatEl.value !== '') {
//       e.preventDefault();
//     } else if (inputTextDesEl.value !== '' && inputTextCatEl.value !== '') {
//       dialogAddNewTaskEl.removeEventListener('keydown', validateEnterTask);
//     }
//   };

//   btnOpenEl.addEventListener('click', () => {
//     dialogAddNewTaskEl.showModal();
//     // Doing a foreach because i want to clean both of the inputs before opening the dialog
//     inputTextsEl.forEach(dialText => (dialText.value = ''));
//     // I put this event handler here so the validation can start right away.
//     dialogAddNewTaskEl.addEventListener('keydown', validateEnterTask);
//   });

//   // All the ways to close the dialogs
//   dialogsEl.forEach(dialog => {
//     btnsCloseEl.forEach(btnClose =>
//       btnClose.addEventListener('click', () => dialog.close())
//     );

//     dialog.addEventListener('click', e => {
//       const dialogRect = dialog.getBoundingClientRect();
//       const checkClickInsideDialog =
//         e.clientY >= dialogRect.top &&
//         e.clientY <= dialogRect.top + dialogRect.height &&
//         e.clientX >= dialogRect.left &&
//         e.clientX <= dialogRect.left + dialogRect.width;
//       if (!checkClickInsideDialog) dialog.close();
//     });
//   });

//   // 1.2 Render the new task to the incomplete task list each time the add-new-task button is clicked
//   const renderNewTask = () => {
//     // Function to format the value input to the first letter to be uppercase
//     const randomID = Math.floor(Math.random() * 10000);
//     const insertTask = () => {
//       // Checks if the inputs are empty, if they are, then we return until the user fills the inputs.
//       if (inputTextCatEl.value === '' || inputTextDesEl.value === '') return;

//       // Formatting the values and adding the randomid in the html
//       const markup = `
//       <div class="tasks__item" data-status="incompleted">
//         <input
//           class="tasks__checkbox"
//           type="checkbox"
//           id="${randomID}"
//         />
//         <div class="tasks__description">
//           <label class="tasks__label">
//           ${
//             inputTextDesEl.value[0].toUpperCase() +
//             inputTextDesEl.value.slice(1).toLowerCase()
//           }
//           </label>
//           <p class="tasks__category">${
//             inputTextCatEl.value[0].toUpperCase() +
//             inputTextCatEl.value.slice(1).toLowerCase()
//           }</p>
//           </div>
//           <button
//             class="btn btn--delete"
//             aria-label="Remove task item"
//             title="Remove task item"
//             >
//             <svg class="btn__icon btn__icon--delete">
//             <use href="${icons}#icon-trashcan"></use>
//             </svg>
//             </button>
//       </div>
//     `;

//       // When adding a new item, the score of the one belonging to the list increases.
//       counterTasksIncompleted++;
//       headerStatusIncompletedEl.textContent = counterTasksIncompleted;

//       p.replaceWith(tasksIncompletedEl);

//       // Inserting the html
//       tasksIncompletedEl.insertAdjacentHTML('afterbegin', markup);
//       // Closing the dialog after adding the task and open the success dialog
//       dialogAddNewTaskEl.close();
//       // Showing the dialog success
//       dialogSuccessTaskAddedEl.showModal();
//     };
//     btnAddNewTaskEl.addEventListener('click', insertTask);
//   };
//   renderNewTask();
// };
// addNewTask();

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
