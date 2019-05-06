'use strict';

const express = require('express');
const path = require('path');
const TasksService = require('./tasks-service');
const { requireAuth } = require('../middleware/jwt-auth');

const tasksRouter = express.Router();
const jsonBodyParser = express.json();


//TODO: do i need to check if user exists?
tasksRouter
  .route('/:user_id')
  .all(requireAuth)
  .get((req, res, next) => {
    TasksService.getUserTasks(
      req.app.get('db'),
      req.params.user_id
    )
      .then(tasks => {
        res.json(TasksService.serializeTasks(tasks));
      })
      .catch(next);
  });

tasksRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { task_name, duration, priority, user_id } = req.body;
    const newTask = { task_name, duration, priority, user_id };

    for (const [key, value] of Object.entries(newTask))
      if (value === null || value === undefined)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
    
    TasksService.insertTask(
      req.app.get('db'),
      newTask
    )
      .then(task => {
        res
          .status(201)
          //is this location piece necessary?  is it even true?
          .location(path.posix.join(req.originalUrl, `/${task.id}`))
          .json(TasksService.serializeTask(task[0]));
      })
      .catch(next);
  });

module.exports = tasksRouter;