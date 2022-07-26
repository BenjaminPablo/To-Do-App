import * as model from './model';
import addTaskView from './views/addTaskView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

const controlAddTask = function (newTask) {
  // Add the new task to the state
  model.addTask(newTask);
  // Render task
  // addTaskView.render(model.state.task);
  // Success message
  addTaskView.renderMessage();
};

const controlLoadTasks = function () {};

const init = function () {
  addTaskView.addHandlerNewTask(controlAddTask);
};
init();
