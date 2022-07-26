export default class View {
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentEl.insertAdjacentHTML('afterend', markup);
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._parentEl.insertAdjacentHTML('afterend', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    document.body.insertAdjacentHTML('beforeend', markup);
  }

  renderError() {}
}
