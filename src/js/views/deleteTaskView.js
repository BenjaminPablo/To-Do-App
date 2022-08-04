import counterTaskView from './counterTaskView';
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
      const inTaskList = taskItem.closest('.tasks--incompleted');
      const comTaskList = taskItem.closest('.tasks--completed');
      let description, category, deletedTask;
      if (inTaskList) {
        description = taskItem
          .querySelector('.tasks__description')
          .textContent.trim();
        category = taskItem
          .querySelector('.tasks__category')
          .textContent.trim();
        deletedTask = { description, category };
      }
      if (comTaskList) {
        description = taskItem
          .querySelector('.tasks__description')
          .textContent.trim();
        deletedTask = { description };
      }
      taskItem.remove();
      handler(deletedTask);
      counterTaskView.decreaseCounter(deletedTask, inTaskList);
    });
  }
}

export default new DeleteTaskView();
