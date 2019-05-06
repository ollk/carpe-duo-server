'use strict';

const express = require('express');
const path = require('path');
const SleepService = require('./sleep-service');
const { requireAuth } = require('../middleware/jwt-auth');

const sleepRouter = express.Router();
const jsonBodyParser = express.json();

sleepRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const {id, userSatWake, userSatBed, userSunWake, userSunBed } = req.body;
    const newSleep = { id, userSatWake, userSatBed, userSunWake, userSunBed };

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
          //is this location piece necessary?  is it even true?
          .location(path.posix.join(req.originalUrl, `/${sleep.id}`))
          .json(sleep);
      })
      .catch(next);
  });

module.exports = sleepRouter;