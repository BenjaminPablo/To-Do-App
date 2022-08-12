import * as model from './model';
import addTaskView from './views/addTaskView';
import deleteTaskView from './views/deleteTaskView';
import counterView from './views/counterView';
import completedTaskView from './views/completedTaskView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlTasks = function () {
  addTaskView.renderMessage();
  completedTaskView.renderMessage();
  // If there is some tasks, then render them
  addTaskView.render(model.state.task.incompleted);
  counterView.loadCounter(model.state.task.incompleted);
};

const controlAddTask = function (newTask) {
  model.addNewTask(newTask);
  addTaskView.renderSpinner();
  addTaskView.render(model.state.task.incompleted);
  counterView.increaseCounter();
};

const controlDeleteTask = function (task) {
  model.deleteTask(task);
  counterView.decreaseCounter();
  if (model.state.task.incompleted.length === 0) addTaskView.renderMessage();
};

const controlUpdateTask = function (task) {
  console.log(task);
};

const init = function () {
  addTaskView.addHandlerRender(controlTasks);
  addTaskView.addHandlerNewTask(controlAddTask);
  addTaskView.addHandlerUpdateTask(controlUpdateTask);
  deleteTaskView.addHandlerDelete(controlDeleteTask);
};
init();
