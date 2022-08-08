import * as model from './model';
import addTaskView from './views/addTaskView';
import deleteTaskView from './views/deleteTaskView';
import taskView from './views/taskView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

const controlTasksOnLoad = function (tasks) {
  taskView.render(model.sendData(tasks));
};

const controlAddTask = function (newTask) {
  // Get new task
  const task = model.addNewTask(newTask);
  addTaskView.render(task);
};

const controlDeleteTask = function (task) {
  model.deleteTask(task);
};

const init = function () {
  taskView.addHandlerOnLoad(controlTasksOnLoad);
  addTaskView.addHandlerNewTask(controlAddTask);
  deleteTaskView.addHandlerDelete(controlDeleteTask);
};
init();
