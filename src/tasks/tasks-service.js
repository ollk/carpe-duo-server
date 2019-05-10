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

  updateTask(db, task) {
    return db
      .into('carpeduo_tasks')
      .update({
        scheduled: task.scheduled,
        position: task.position
      })
      .where('id', task.id)
      .returning('*');
  },

  resetTasks(db, user_id) {
    return db
      .into('carpeduo_tasks')
      .update({
        scheduled: false
      })
      .where('user_id', user_id)
      .returning('*');
  },

  deleteTask(db, id) {
    return db
      .into('carpeduo_tasks')
      .del()
      .where('id', id)
      .returning('id');
  },

  serializeTask(task) {
    return {
      id: task.id,
      task_name: xss(task.task_name),
      duration: task.duration,
      priority: task.priority,
      user_id: task.user_id,
      scheduled: task.scheduled,
      position: task.position
    };
  },

  serializeTasks(tasks) {
    return tasks.map(this.serializeTask);
  }
};

module.exports = TasksService;