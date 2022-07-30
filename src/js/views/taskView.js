import View from './View';

class TaskView extends View {
  // _tasksIncompletedEl = Array.from(document.querySelectorAll('.tasks__label'));
  // _tasksCompletedEl = Array.from(
  //   document.querySelectorAll('.tasks--completed .tasks__description')
  // );

  // addHandlerSortTasks(handler) {
  //   const tasks = this.getTaskValues();
  //   window.addEventListener('load', function () {
  //     handler(tasks);
  //   });
  // }

  // getTaskValues() {
  //   let description, category;
  //   const taskInVal = this._tasksIncompletedEl.map(task => {
  //     Array.from(task.children).forEach(task =>
  //       task.className === 'tasks__description'
  //         ? (description = task.textContent)
  //         : (category = task.textContent)
  //     );

  //     return { description, category };
  //   });
  //   return taskInVal;
  // }

  _tasksItemEl = Array.from(document.querySelectorAll('.tasks__item'));

  addHandlerSortTasks(handler) {
    const tasks = this._getTaskValues();
    window.addEventListener('load', function () {
      handler(tasks);
    });
  }

  _getTaskValues() {
    let description, category;
    const arrObj = this._tasksItemEl.map(task => {
      return Array.from(task.children)
        .filter(
          task =>
            task.className.startsWith('tasks') &&
            !task.className.includes('checkbox')
        )
        .reduce((_acc, task) => {
          if (task.className === 'tasks__description') {
            console.log(task);
            description = task.textContent;
            return { acc: description };
          }
          return { description };
          // const test = Array.from(task.children).map(task => {
          //   task.className === 'tasks__description'
          //     ? (description = task.textContent)
          //     : (category = task.textContent);
          // });
        });
    });
    console.log(arrObj);
    return arrObj;
  }
}

export default new TaskView();
