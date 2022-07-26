import { COUNTER_START } from './config';

export const state = {
  counter: COUNTER_START,
  date: new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }),
  task: [
    {
      id: '5287287245',
      description: 'Upload 1099-R to TurboTax',
      category: '💰 Finance',
    },
    {
      id: '345354354',
      description: 'Submit 2019 tax return',
      category: '💰 Finance',
    },
    {
      id: '543453543',
      description: 'Print parking passes',
      category: '💞 Wedding',
    },
    {
      id: '535435435',
      description: 'Sign contract, send back',
      category: '🖥️ Freelance',
    },
    {
      id: '238734535',
      description: 'Hand sanitizer',
      category: '🛒 Shopping List',
    },
    {
      id: '4535435435',
      description: 'Check on FedEx Order',
    },
    {
      id: '3543543232',
      description: 'Look at new plugins',
    },
    {
      id: '45354345',
      description: 'Respond to catering company',
    },
    {
      id: '543543543',
      description: 'Reschedule morning coffee',
    },
    {
      id: '53543543',
      description: 'Check the latest on Community',
    },
  ],
};

const persistTask = function () {
  // (Date.now() + '').slice(-10)
  localStorage.setItem('tasks', JSON.stringify(state.task));
  const data = JSON.parse(localStorage.getItem('tasks'));
  if (!data) return;
  console.log(data);
  return data;
};
persistTask();

export const addTask = function (newTask) {};

const init = function () {
  // persistTask();
  // const data = JSON.parse(localStorage.getItem('tasks'));
  // if (!data) return;
  // return data;
};
// init();
