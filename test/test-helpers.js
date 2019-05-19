'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      first_name: 'TU1',
      user_name: 'test-user-1',
      password: 'password',
      sat_wake: 14,
      sat_bed: 44,
      sun_wake: 62,
      sun_bed: 92
    },
    {
      id: 2,
      first_name: 'TU2',
      user_name: 'test-user-2',
      password: 'password',
      sat_wake: 14,
      sat_bed: 44,
      sun_wake: 62,
      sun_bed: 92
    },
    {
      id: 3,
      first_name: 'TU3',
      user_name: 'test-user-3',
      password: 'password',
      sat_wake: 14,
      sat_bed: 44,
      sun_wake: 62,
      sun_bed: 92
    },
    {
      id: 4,
      first_name: 'TU4',
      user_name: 'test-user-4',
      password: 'password',
      sat_wake: 14,
      sat_bed: 44,
      sun_wake: 62,
      sun_bed: 92
    }
  ];
}

function makeTasksArray(users) {
  return [
    {
      id: 1,
      task_name: 'test task 1',
      duration: 30,
      scheduled: true,
      position: 60,
      priority: 'low',
      user_id: users[0].id
    },
    {
      id: 2,
      task_name: 'test task 2',
      duration: 60,
      scheduled: false,
      position: 0,
      priority: 'medium',
      user_id: users[1].id
    },
    {
      id: 3,
      task_name: 'test task 3',
      duration: 90,
      scheduled: true,
      position: 120,
      priority: 'high',
      user_id: users[2].id
    },
    {
      id: 4,
      task_name: 'test task 4',
      duration: 120,
      scheduled: false,
      position: 0,
      priority: 'low',
      user_id: users[3].id
    }
  ];
}

function makeFixtures() {
  const testUsers = makeUsersArray();
  const testTasks = makeTasksArray(testUsers)

  return { testUsers, testTasks };
}

//TODO: may need to fix this
function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      carpeduo_tasks,
      carpeduo_users
      RESTART IDENTITY CASCADE`
  );
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('carpeduo_users').insert(preppedUsers)
    .then(() =>
      db.raw(
        `SELECT setval('carpeduo_users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}

function seedTables(db, users, tasks) {
  return seedUsers(db, users)
    .then(() => 
      db 
        .into('carpeduo_tasks')
        .insert(tasks)
    )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({user_id: user.id}, secret, {
    subject: user.user_name,
    algorithm: 'HS256'
  })
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,

  makeFixtures,
  cleanTables,
  seedUsers,
  makeAuthHeader,
  seedTables
};