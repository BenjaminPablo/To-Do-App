import showOptionsView from './showOptionsView';
import View from './View';

class DeleteTaskView extends View {
  _parentEl = document.querySelector('.btn--options');

  constructor() {
    super();
    showOptionsView.renderOptions();
    showOptionsView.hideOptions();
  }

  deleteTask() {}
}

export default new DeleteTaskView();
