'use strict';

const express = require('express');
const SleepService = require('./sleep-service');
const { requireAuth } = require('../middleware/jwt-auth');

const sleepRouter = express.Router();
const jsonBodyParser = express.json();

sleepRouter
  .route('/:user_id')
  .all(requireAuth)
  .get((req, res, next) => {
    SleepService.getUserSleep(
      req.app.get('db'),
      req.params.user_id
    )
      .then(sleep => {
        res.json(sleep[0]);
      })
      .catch(next);
  });

sleepRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const {id, sat_wake, sat_bed, sun_wake, sun_bed } = req.body;
    const newSleep = { id, sat_wake, sat_bed, sun_wake, sun_bed };

    for (const [key, value] of Object.entries(newSleep))
      if (value === null || value === undefined)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
    
    SleepService.updateSleep(
      req.app.get('db'),
      newSleep
    )
      .then(sleep => {
        res
          .status(200)
          .json(sleep);
      })
      .catch(next);
  });

module.exports = sleepRouter;