import View from './View.js';

class ShowOptionsView extends View {
  _parentEl = document.querySelector('.section-tasks');

  showOptions() {
    ['click', 'focusout'].forEach(ev =>
      this._parentEl.addEventListener(ev, this._handleOptions)
    );
  }

  _handleOptions(e) {
    const btnOptionsEl = e.target.closest('.btn--options');
    if (!btnOptionsEl) return;

    console.dir(e.target);
    const optionListEl = btnOptionsEl.nextElementSibling;
    const btnDeleteEl = optionListEl.firstElementChild;

    if (e.type === 'click') {
      optionListEl.classList.toggle('hidden');
    }

    if (e.type === 'focusout' && e.relatedTarget !== btnDeleteEl) {
      optionListEl.classList.add('hidden');
    }
  }
}

export default new ShowOptionsView();
