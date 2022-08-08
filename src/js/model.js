import cloneDeep from 'lodash-es';

export const state = {
  task: {
    incompleted: [],
    completed: [],
  },
};

export const sendData = function (tasks) {
  state.task = tasks;
  Object.values(state.task).forEach(sortArr);
  return tasks;
};

const sortArr = function (task) {
  task.sort((a, b) =>
    a.description.toUpperCase() > b.description.toUpperCase() ? 1 : -1
  );
};

export const addNewTask = function (newTask) {
  const taskArr = Object.values(newTask)[0];
  const description = taskArr[0].toUpperCase() + taskArr.slice(1);
  const category = newTask.category;
  const task = {
    id: +(Date.now() + '').slice(-10),
    description,
    category,
  };
  state.task.incompleted.push(task);
  // To sort again the state.task.incompleted but this time with the newTask added.
  sortArr(state.task.incompleted);
  // Then we set the localstorage with all the tasks including the new Task
  setLocalStorage(state.task.incompleted);
  return state.task.incompleted;
};

const setLocalStorage = function (tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const deleteTask = function (task) {
  const indexTask = state.task.incompleted.findIndex(t =>
    t.description.startsWith(task.description)
  );
  state.task.incompleted.splice(indexTask, 1);
  setLocalStorage(state.task.incompleted);
};

const init = function () {
  // addNewTask();
};
// init();
