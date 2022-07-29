import * as model from './model';
import addTaskView from './views/addTaskView';
import deleteTaskView from './views/deleteTaskView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

const controlLoadTask = function () {
  // Load sorted tasks
  addTaskView.renderTaskOnLoad(model.sortDefaultTasks());

  addTaskView.renderMessage();
};

const controlAddTask = function (newTask) {
  // Get new task
  const task = model.addNewTask(newTask);

  // Render the new list the the new task ... Very bad performance but until I learned ReactJS
  addTaskView.render(task);
};

const controlDeleteTask = function (task) {
  // deleteTaskView.render(task);
};

const init = function () {
  addTaskView.addHandlerRender(controlLoadTask);
  addTaskView.addHandlerNewTask(controlAddTask);
};
init();
