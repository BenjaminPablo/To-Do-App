import View from './View';

import { COUNTER_TASKS, CURRENT_DATE } from '../config.js';

class CounterView extends View {
  _parentEl = document.querySelector('.header');
  _counterInEl = document.querySelector('.header__incompleted');
  _counterComEl = document.querySelector('.header__completed');
  _dateEl = document.querySelector('.header__date');

  _counter = COUNTER_TASKS;
  _date = CURRENT_DATE;

  constructor() {
    super();
    this._dateEl.textContent = this._date;
    this._counterInEl.textContent = this._counterComEl.textContent =
      this._counter;
  }

  loadCounter(tasks) {
    this._counter = tasks.length;
    this._counterInEl.textContent = this._counter;
  }

  increaseCounter(task, parentTask) {
    this._counter++;
    this._counterInEl.textContent = this._counter;
  }

  decreaseCounter(taskList) {
    this._counter--;
    this._counterInEl.textContent = this._counter;
  }
}

export default new CounterView();
