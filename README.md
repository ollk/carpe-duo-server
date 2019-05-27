# Carpe Duo API

## Overview
Express server used by [Carpe Duo](https://github.com/ollk/carpe-duo-client) React app.

## Documentation

### POST /login
User login  
*user_name* and *password* required in body

### POST /users
Create new user
*user_name*, *password* and *first_name* required in body

### POST /sleep
Post waking hours
*sat_wake*, *sat_bed*, *sun_wake* and *sun_bed*  required in body

### GET /sleep/:user_id
Get user's waking hours

### POST /tasks
Create new task
*task_name*, *duration*, *priority* and *user_id* required in body

### GET /tasks/:user_id
Get user's tasks

### POST /tasks/:id
Schedule task
*position* and *scheduled* required in body

### POST /tasks/reset/:user_id
Unschedule all user tasks

### DELETE /tasks/:id
Delete task

## Node Modules Installed

### Dependicies
* express
* morgan
* cors
* helmet
* dotenv

### DevDependecies
* mocha
* chai
* supertest
* nodemon
