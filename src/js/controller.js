import * as model from './model';
import addTaskView from './views/addTaskView';
import deleteTaskView from './views/deleteTaskView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

const controlAddTask = function (newTask) {
  model.addNewTask(newTask);
  addTaskView.render(model.state.task.incompleted);
};

const controlDeleteTask = function (task) {
  model.deleteTask(task);
};

const init = function () {
  addTaskView.addHandlerNewTask(controlAddTask);
  deleteTaskView.addHandlerDelete(controlDeleteTask);
};
init();
