import View from './View.js';

class ShowOptionsView extends View {
  _parentEl = document.querySelector('.section-tasks');

  renderOptions() {
    this._parentEl.addEventListener('click', function (e) {
      const optionsEl = document.querySelector('.options__list');
      const btnOptionsEl = e.target.closest('.btn--options');
      if (!btnOptionsEl) return;
      optionsEl.classList.toggle('hidden');
    });
  }

  hideOptions() {
    const optionsEl = document.querySelector('.options__list');
    optionsEl.addEventListener('focusout', function (e) {
      optionsEl.classList.toggle('hidden');
    });
  }
}

export default new ShowOptionsView();
