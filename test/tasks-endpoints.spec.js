'use strict';
/* global supertest, expect */

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

  before('insert tasks', () => {
    helpers.seedTables(
      db,
      testUsers,
      testTasks
    );
  });


  describe('GET /api/tasks/:user_id', () => {


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

  describe('POST /api/tasks', () => {
    before('cleanup', () => helpers.cleanTables(db));
    before('insert tasks', () => {
      helpers.seedTables(
        db,
        testUsers
      );
    });
    it('creates a task, responding with 201 and the new task', () => {
      const testUser = testUsers[0];
      const newTask = {
        task_name: 'Test new task',
        duration: 30,
        priority: 'medium',
        user_id: testUser.id
      };
      return supertest(app)
        .post('/api/tasks')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(newTask)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property('id');
          expect(res.body.task_name).to.eql(newTask.task_name);
          expect(res.body.duration).to.eql(newTask.duration);
          expect(res.body.priority).to.eql(newTask.priority);
          expect(res.body.user_id).to.eql(testUser.id);
        })
        .expect(res =>
          db
            .from('carpeduo_tasks')
            .select('*')
            .where({ id: res.body.id })
            .first()
            .then(row => {
              expect(row.task_name).to.eql(newTask.task_name);
              expect(row.duration).to.eql(newTask.duration);
              expect(row.priority).to.eql(newTask.priority);
              expect(row.user_id).to.eql(testUser.id);
            })
        );
    });
  });

  describe('POST /api/tasks/:id', () => {
    it('schedules a task, responding with 200 and the schedule data', () => {
      const updatedTask = {
        id: 1,
        position: 120,
        scheduled: true
      };
      return supertest(app)
        .post('/api/tasks/1')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(updatedTask)
        .expect(200)
        .expect(res => {
          expect(res.body[0]).to.have.property('id');
          expect(res.body[0]).to.have.property('task_name');
          expect(res.body[0]).to.have.property('user_id');
          expect(res.body[0].position).to.eql(updatedTask.position);
          expect(res.body[0].scheduled).to.eql(updatedTask.scheduled);
        });
    });
  });
});
