export const state = {
  task: {
    incompleted: [],
    completed: [],
    list: [],
  },
};

export const pushTasksOnLoad = function (task) {
  task.forEach(task =>
    task.forEach(task => {
      task.id = +(Date.now() + '').slice(-10);
      return !task.category
        ? state.task.completed.push(task)
        : state.task.incompleted.push(task);
    })
  );
};

console.log(state.task.incompleted);

export const sortTasksOnLoad = function (task) {
  return task.map(task => {
    const sort = sortArr(task);
    return sort;
  });
};

const sortArr = function (task) {
  return task.sort((a, b) => {
    const desA = a.description.toUpperCase();
    const desB = b.description.toUpperCase();
    return desA > desB ? 1 : -1;
  });
};

export const sortTaskArr = function (statusTask) {
  const sortTasks = sortArr(statusTask);
  return sortTasks;
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
