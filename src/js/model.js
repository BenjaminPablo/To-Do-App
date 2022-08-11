export const state = {
  task: {
    incompleted: [],
    completed: [],
  },
};

const sortArr = function (task) {
  task.sort((a, b) =>
    a.description.toUpperCase() > b.description.toUpperCase() ? 1 : -1
  );
};

export const addNewTask = function (newTask) {
  state.task.incompleted.push({
    description:
      newTask.description[0].toUpperCase() + newTask.description.slice(1),
    category: newTask.category,
    status: 'incompleted',
  });
  persistStorage();
};

const persistStorage = function () {
  localStorage.setItem('tasks', JSON.stringify(state.task.incompleted));
};

export const deleteTask = function (task) {
  const indexTask = state.task.incompleted.findIndex(t =>
    t.description.startsWith(task.description)
  );
  state.task.incompleted.splice(indexTask, 1);
  persistStorage();
};

const init = function () {
  const storage = localStorage.getItem('tasks');
  if (storage) state.task.incompleted = JSON.parse(storage);
};
init();
