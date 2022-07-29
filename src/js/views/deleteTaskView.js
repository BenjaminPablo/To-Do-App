import View from './View';

class DeleteTaskView extends View {
  _parentEl = document.querySelector('.btn--options');

  constructor() {
    super();
  }

  deleteTask() {}
}

export default new DeleteTaskView();
