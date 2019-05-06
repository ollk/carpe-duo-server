'use strict';

const xss = require('xss');

const TasksService = {

  getUserTasks(db, user_id) {
    return db
      .from('carpeduo_tasks')
      .select('*')
      .where('user_id', user_id);
  },

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
  },

  serializeTasks(tasks) {
    return tasks.map(this.serializeTask);
  }
};

module.exports = TasksService;