# Carpe Duo API

## Overview
Express server used by [Carpe Duo](https://github.com/ollk/carpe-duo-client) React app.

## Documentation

### POST /login

### POST /users

### POST /sleep

### GET /sleep/:user_id

### POST /tasks

### GET /tasks/:user_id

### POST /tasks/:id

### POST /tasks/reset/:user_id


When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.



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
