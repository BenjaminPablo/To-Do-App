import View from './View';

class CompletedTaskView extends View {
  _parentEl = document.querySelector('.tasks--completed .tasks__list');
  _message = 'You have completed your daily tasks! You can take a break!';
}

export default new CompletedTaskView();
