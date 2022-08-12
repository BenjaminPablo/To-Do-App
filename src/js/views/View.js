import icons from '../../img/svg/sprite.svg';
import counterView from './counterView';

export default class View {
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    if (data.length !== 0) this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('beforeend', markup);
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('beforeend', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <figure class="message">
        <svg class="message__icon">
          <use href="${icons}#icon-smile"></use>
        </svg>
        <figcaption>${message}</figcaption>
      </figure>`;

    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('beforeend', markup);
  }

  renderError() {}
}
