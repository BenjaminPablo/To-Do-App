import * as model from './model';
import addTaskView from './views/addTaskView';
import deleteTaskView from './views/deleteTaskView';
import counterView from './views/counterView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlAddTask = function (newTask) {
  model.addNewTask(newTask);
  addTaskView.renderSpinner();

  addTaskView.render(model.state.task.incompleted);
};

const controlDeleteTask = function (task) {
  model.deleteTask(task);
};

const controlTasks = function () {
  addTaskView.render(model.state.task.incompleted);
  counterView.loadCounter(model.state.task.incompleted);
};

const init = function () {
  addTaskView.addHandlerRender(controlTasks);
  addTaskView.addHandlerNewTask(controlAddTask);
  deleteTaskView.addHandlerDelete(controlDeleteTask);
};
init();
