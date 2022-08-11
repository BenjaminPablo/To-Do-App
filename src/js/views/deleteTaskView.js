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
      const description = taskItem
        .querySelector('.tasks__description')
        .textContent.trim();
      const category = taskItem
        ?.querySelector('.tasks__category')
        .textContent.trim();
      handler({
        description,
        ...(category && { category }),
      });
      taskItem.remove();
      counterView.decreaseCounter();
      const inTasks = document.querySelector(
        '.tasks--incompleted .tasks__list'
      );
      if (inTasks.children.length === 0)
        inTasks.textContent =
          'You have completed your daily tasks! You can take a break!';
    });
  }
}

export default new DeleteTaskView();
