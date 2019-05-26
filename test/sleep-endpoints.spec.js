'use strict';
/* global supertest */

const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Sleep Endpoints', function() {
  let db;

  const {
    testUsers
  } = helpers.makeFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  before('insert sleep', () => {
    helpers.seedUsers(
      db,
      testUsers
    );
  });

  describe('GET /api/sleep/:user_id', () => {
    it('responds with 200 and user sleep data', () => {
      const userId = 1;
      const { sat_wake, sat_bed, sun_wake, sun_bed } = testUsers[0];
      const expectedSleepData = {sat_wake, sat_bed, sun_wake, sun_bed};

      return supertest(app)
        .get(`/api/sleep/${userId}`)
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200, expectedSleepData);
    });
  });

  describe('POST /api/sleep', () => {
    it('updates user sleep, responding with 200 and updated data', () => {
      const {sat_wake, sat_bed, sun_wake, sun_bed} = testUsers[1];
      const newData = { id: testUsers[0].id, sat_wake, sat_bed, sun_wake, sun_bed };
      const expectedRes = [{sat_wake, sat_bed, sun_wake, sun_bed}];

      return supertest(app)
        .post('/api/sleep')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(newData)
        .expect(200, expectedRes);

    });
  });
});
