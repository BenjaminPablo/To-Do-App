import icons from '../img/svg/sprite.svg';

class Task {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  list = 'incompleted';

  constructor(description, category) {
    this.description = description;
    this.category = category;
  }
}

////////////////////////////////////////////////////////////
// APPLICATION ARCHITECTURE

// Header component
const counterIncompletedEl = document.querySelector('.header__incompleted');
// Tasks Component
const tasksHeadingEl = document.querySelector('.tasks__heading');
// Buttons
const btnTaskFormEl = document.querySelector('.btn--task-form');
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
  #tasks = [];

  constructor() {
    btnTaskFormEl.addEventListener('click', this.#showTaskForm.bind(this));
    formEl.addEventListener('input', this.#enableBtnSubmit.bind(this));
    btnCancelEl.addEventListener('click', this.#hideTaskForm);
    formEl.addEventListener('focusout', this.#hideTaskForm);
    document.addEventListener('keydown', this.#hideTaskForm);
    formEl.addEventListener('submit', this.#newTask.bind(this));
    btnSubmitEl.addEventListener('click', this.#newTask.bind(this));
  }

  #showTaskForm() {
    formTextEl.value = formSelectEl.value = '';
    this.#btnInert(btnSubmitEl);
    formEl.classList.remove('hidden');
    btnTaskFormEl.classList.add('hidden');
    formTextEl.focus();
  }

  #enableBtnSubmit() {
    formTextEl.value !== '' && formSelectEl.value !== ''
      ? this.#btnNoInert(btnSubmitEl)
      : this.#btnInert(btnSubmitEl);
  }

  #btnInert(btn) {
    btn.setAttribute('inert', '');
    btn.classList.add('u-opacity-0-5');
  }

  #btnNoInert(btn) {
    btn.removeAttribute('inert', '');
    btn.classList.remove('u-opacity-0-5');
  }

  #hideTaskForm(e) {
    if (e.type === 'click') e.preventDefault();
    if (e.relatedTarget === null || e.key === 'Escape') {
      btnTaskFormEl.classList.remove('hidden');
      btnTaskFormEl.focus();
      formEl.classList.add('hidden');
    }
  }

  #newTask(e) {
    const validInputs = (...inputs) => inputs.every(inp => inp !== '');
    e.preventDefault();

    const description = formTextEl.value;
    const category = formSelectEl.value;

    if (!validInputs(description, category))
      return console.log('Inputs cannot be empty!');

    const task = new Task(description, category);
    this.#tasks.push(task);
    console.log(task);
    console.log(this.#tasks);

    this.#renderTask(task);

    // When adding a new item, the score of the one belonging to the list increases.
    this.#counterTasksIncompleted++;
    counterIncompletedEl.textContent = this.#counterTasksIncompleted;

    this.#hideTaskForm(e);
  }

  #renderTask(task) {
    const html = `
    <fieldset class="tasks__item" data-status="incompleted" tabindex="0" data-id="${
      task.id
    }">
      <input
        class="tasks__checkbox"
        type="checkbox"
        aria-label="checkbox"
      />
      <label class="tasks__label">
        <span class="tasks__description">${
          task.description[0].toUpperCase() + task.description.slice(1)
        }</span>
        <span class="tasks__category">${task.category}</span>
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

    tasksHeadingEl.insertAdjacentHTML('afterend', html);
  }

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
// console.log(app);

// document.addEventListener('keydown', () => {
//   console.log(document.activeElement);
// });

// const p = document.createElement('p');
// const pCompleted = document.createElement('p');
// p.textContent = `You don't have any tasks for the moment to complete! 🎉`;
// pCompleted.textContent = `Your completed tasks are empty! 🎉`;

// ✅ 2. Be able to remove existing elements from a list
// 2.1 Add event handler to the delete button to show the dialog of confirmation to delete the task.
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

// ✅ 3. Be able to rename existing elements in a list
// const renameTask = () => {
// // tasksDescriptionEl.forEach(task => {
//   // 3.1. Replace the label with a new input field by double clicking the label, of course, to edit it.
//   tasksIncompletedEl.addEventListener('dblclick', e => {
//     const taskDesChild = e.target.closest(`.${task.className}`);
//     if (!taskDesChild) return;
//     const newInput = document.createElement('input');
//     const typeChild =
//       task.className === 'tasks__label'
//         ? 'input-text__update--description'
//         : 'input-text__update--category';
//     newInput.classList.add('input-text', typeChild);
//     // We assign the value of the task label to the new input, and we also delete the spaces.
//     newInput.value = taskDesChild.textContent.trim();
//     // Then, we replace the task label with the new input whenever the user double clicks the label.
//     taskDesChild.replaceWith(newInput);
//     // newInput.setSelectionRange(0, 0);
//     newInput.focus();
//     const onFocus = function () {
//       // We delete the listener and the replace with each time so we can get a new replacewith method working
//       this.removeEventListener('blur', onFocus);
//       // So, if we lose the focus on the input, we replace it with the label that was preceding it.
//       this.replaceWith(taskDesChild);
//     };
//     newInput.addEventListener('blur', onFocus);
//     newInput.addEventListener('keydown', function (e) {
//       // If we just hit escape, we do replace the input with the label, but with any changes at all.
//       if (e.key === 'Escape') {
//         this.removeEventListener('blur', onFocus);
//         this.replaceWith(taskDesChild);
//       }
//       // Meanwhile we hit enter and the value is not empty, we can store that value to the task and display it
//       if (e.key === 'Enter' && this.value !== '') {
//         this.removeEventListener('blur', onFocus);
//         taskDesChild.textContent = this.value;
//         this.replaceWith(taskDesChild);
//       }
//     });
//   });
// });
// };
// renameTask();

// ✅ 4. Be able to see the number of complete and incomplete elements
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
