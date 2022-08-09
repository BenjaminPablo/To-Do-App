import View from './View';

class IncompletedTaskView extends View {
  _parentEl = document.querySelector('.tasks--incompleted .tasks__list');
}

export default new IncompletedTaskView();
