'use strict';

const xss = require('xss');

const TasksService = {

  insertTask(db, newTask) {
    return db
      .insert(newTask)
      .into('carpeduo_tasks')
      .returning('*');
    //end here?  may work for this purpose
  },

  serializeTask(task) {
    return {
      id: task.id,
      task_name: xss(task.task_name),
      duration: task.duration,
      priority: task.priority,
      user_id: task.user_id
    };
  }
};

module.exports = TasksService;