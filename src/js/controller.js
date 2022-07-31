import * as model from './model';
import addTaskView from './views/addTaskView';
import deleteTaskView from './views/deleteTaskView';
import taskView from './views/taskView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

const controlAddTask = function (newTask) {
  // Get new task
  const task = model.addNewTask(newTask);

  // addTaskView.render(task);
};

const controlSortTasks = function (tasks) {
  model.pushTasksOnLoad(tasks);
  const tasksSorted = model.sortTasksOnLoad(tasks);

  taskView.renderTask(tasksSorted);
};

const controlDeleteTask = function (task) {
  // deleteTaskView.render(task);
};

const init = function () {
  addTaskView.addHandlerNewTask(controlAddTask);
  taskView.addHandlerSortTasks(controlSortTasks);
};
init();
