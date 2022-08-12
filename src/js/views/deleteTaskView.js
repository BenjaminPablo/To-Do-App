import counterView from './counterView';
import showOptionsView from './showOptionsView';
import View from './View';

class DeleteTaskView extends View {
  _parentEl = document.querySelector('.section-tasks');

  constructor() {
    super();
    showOptionsView.showOptions();
  }

  addHandlerDelete(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btnDeleteEl = e.target.closest('.btn--delete');
      if (!btnDeleteEl) return;
      const taskItem = btnDeleteEl.closest('.tasks__item');
      const description = taskItem.querySelector(
        '.tasks__description'
      ).textContent;
      const status = taskItem.dataset.status;
      handler({ description, status });
      taskItem.remove();
    });
  }
}

export default new DeleteTaskView();
