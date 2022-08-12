export const state = {
  task: {
    incompleted: [],
    completed: [],
  },
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

export const deleteTask = function (task) {
  let delTask;
  if (task.status === 'incompleted') {
    delTask = state.task.incompleted.findIndex(t =>
      t.description.startsWith(task.description)
    );
  }

  console.log(state.task.incompleted);
  console.log(delTask);
  // state.task.incompleted.splice(indexTask, 1);
  persistStorage();
};

const sortArr = function (task) {
  task.sort((a, b) =>
    a.description.toUpperCase() > b.description.toUpperCase() ? 1 : -1
  );
};

const persistStorage = function () {
  localStorage.setItem('tasks', JSON.stringify(state.task.incompleted));
};

const init = function () {
  const storage = localStorage.getItem('tasks');
  if (storage) state.task.incompleted = JSON.parse(storage);
};
init();
