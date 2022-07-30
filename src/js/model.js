export const state = {
  task: {
    incompleted: [],
    completed: [],
    list: [],
  },
};

export const sortTaskArr = function (statusTask) {
  return statusTask.sort((a, b) => {
    const desA = a.description.toUpperCase();
    const desB = b.description.toUpperCase();
    return desA > desB ? 1 : -1;
  });
};

export const addNewTask = function (newTask) {
  const task = {
    id: +(Date.now() + '').slice(-10),
    ...newTask,
  };
  state.task.incompleted.push(task);
  // To sort again the state.task.incompleted but this time with the newTask added.
  sortTaskArr(state.task.incompleted);
  // Then we set the localstorage with all the tasks including the new Task
  setLocalStorage(state.task.incompleted);
  return state.task.incompleted;
};

const setLocalStorage = function (tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const deleteTask = function (task) {
  // const deletedTask = task;
};

const init = function () {
  // addNewTask();
};
// init();
