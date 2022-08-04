import View from './View';

class CounterTaskView extends View {
  _parentEl = document.querySelector('.header');
  _counterInEl = document.querySelector('.header__incompleted');
  _counterComEl = document.querySelector('.header__completed');
  _dateEl = document.querySelector('.header__date');

  _counter = 5;
  _date = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  constructor() {
    super();
    this._dateEl.textContent = this._date;
    this._counterInEl.textContent = this._counterComEl = this._counter;
  }

  increaseCounter(task, parentTask) {
    console.log(task, parentTask);
    this._counter++;
    if (task.category) {
      this._counterInEl.textContent = this._counter;
    } else {
      this._counterComEl.textContent = this._counter;
    }
  }

  decreaseCounter(taskList) {
    this._counter--;
    this._counterInEl.textContent = this._counter;
  }
}

export default new CounterTaskView();
