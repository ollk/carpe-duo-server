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
    },
  ];
}

function makeFixtures() {
  const testUsers = makeUsersArray();

  return { testUsers };
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
  makeAuthHeader
};