import { COUNTER_START, DATE_TODAY } from './config';

export const state = {
  counter: COUNTER_START,
  date: DATE_TODAY,
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
        description: 'Respond to catering company',
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
