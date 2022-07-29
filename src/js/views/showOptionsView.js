import View from './View.js';

class ShowOptionsView extends View {
  _parentEl = document.querySelector('.section-tasks');

  constructor() {
    super();
  }

  renderOptions() {
    this._parentEl.addEventListener('click', function (e) {
      const btnOptionsEl = e.target.closest('.btn--options');
      console.log(btnOptionsEl);
    });
  }
}

export default new ShowOptionsView();
