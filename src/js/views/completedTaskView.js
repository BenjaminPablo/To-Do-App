import View from './View';

class CompletedTaskView extends View {
  parentEl = document.querySelector('.tasks--completed');
}

export default new CompletedTaskView();
