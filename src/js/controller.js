import * as model from './model';
import incompleteTaskView from './views/incompleteTaskView';
import completeTaskView from './views/completeTaskView';
import addTaskView from './views/addTaskView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

const controlLoadTask = function () {
  // Loading existing tasks
  incompleteTaskView.render(model.state.task.incompleted);
  completeTaskView.render(model.state.task.completed);
};

const init = function () {
  addTaskView.addHandlerRender(controlLoadTask);
};
init();
