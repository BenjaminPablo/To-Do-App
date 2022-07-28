import * as model from './model';
import addTaskView from './views/addTaskView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

const controlLoadTask = function () {
  // Load sorted tasks
  addTaskView.renderTaskOnLoad(model.sortTaskArr());
};

const controlAddTask = function (newTask) {
  // Get new task
  addTaskView.render(model.addNewTask(newTask));
};

const init = function () {
  addTaskView.addHandlerRender(controlLoadTask);
  addTaskView.addHandlerNewTask(controlAddTask);
};
init();
