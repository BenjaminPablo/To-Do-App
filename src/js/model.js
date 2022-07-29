export const state = {
  task: {
    incompleted: [
      {
        id: 'ilt001',
        description: 'Upload 1099-R to TurboTax',
        category: '💰 Finance',
      },
      {
        id: 'ilt002',
        description: 'Submit 2019 tax return',
        category: '💰 Finance',
      },
      {
        id: 'ilt003',
        description: 'Print parking passes',
        category: '💞 Wedding',
      },
      {
        id: 'ilt004',
        description: 'Sign contract, send back',
        category: '🖥️ Freelance',
      },
      {
        id: 'ilt005',
        description: 'Hand sanitizer',
        category: '🛒 Shopping List',
      },
    ],
    completed: [
      {
        id: 'clt001',
        description: 'Check on FedEx Order',
      },
      {
        id: 'clt002',
        description: 'Look at new plugins',
      },
      {
        id: 'clt003',
        description: 'respond to catering company',
      },
      {
        id: 'clt004',
        description: 'Reschedule morning coffee',
      },
      {
        id: 'clt005',
        description: 'Check the latest on Community',
      },
    ],
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

export const sortDefaultTasks = function () {
  return Object.values(state.task)
    .filter(task => task.length !== 0)
    .map(task => task.sort((a, b) => (a.description > b.description ? 1 : -1)));
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
