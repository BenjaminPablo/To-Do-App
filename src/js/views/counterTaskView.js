import View from './View';

class CounterTaskView extends View {
  _parentEl = document.querySelector('.header');
  _counterEl = document.querySelector('.header__incompleted');
  _counter = 5;
  _date = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  _dateEl = document.querySelector('.header__date');

  constructor() {
    super();
    this._dateEl.textContent = this._date;
  }

  updateCounter() {
    this._counter++;
    this._counterEl.textContent = this._counter;
  }
}

export default new CounterTaskView();
