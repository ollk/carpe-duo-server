'use strict';

const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Tasks Endpoints', function() {
  let db;

  const {
    testUsers,
    testTasks
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

  //afterEach('cleanup', () => helpers.cleanTables(db));

  // beforeEach('insert tasks', () => {
  //   helpers.seedTables(
  //     db,
  //     testUsers,
  //     testTasks
  //   );
  // });
  before('insert tasks', () => {
    helpers.seedTables(
      db,
      testUsers,
      testTasks
    );
  });


  describe('GET /api/tasks/:user_id', () => {
    //trying testUsers[0].id
    // const userId = 1;
    // const userIdEmpty = 4;


    context('Given no user tasks', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get(`/api/tasks/${testUsers[3].id}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[3]))
          .expect(200, []);
      });
    });

    context('Given user tasks in database', () => {

      it('responds with 200 and user Tasks', () => {
        const expectedTasks = testTasks.filter(task => 
          task.user_id === testUsers[0].id
        );
        return supertest(app)
          .get(`/api/tasks/${testUsers[0].id}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedTasks);
      });
    });
  });
});
