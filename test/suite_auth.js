/* global describe before xit */
'use strict';
let express = require('express');
let AuthRouter = require('./../auth');
let request = require('supertest');
let assert = require('chai').assert;
/**
 * Tests for the Auth suite.
 * Receives an instance of the database, loaded with models.
 * Should create its own express app to use the router in auth/index
 */
module.exports = (db) => {
  let app = express();

  before((done) => {
    // mount the router
    app.use('/', AuthRouter(app));

    done();
  });

  describe('Registration api', () => {
    xit('GET /register describes available registration strategies that have a name and an endpoint', (done) => {
      request(app)
        .get('register')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          if (res.body.length > 0) {
            assert.isDefined(res.body[0]);
            assert.isDefined(res.body[0]['name']);
            assert.isDefined(res.body[0]['endpoint']);
          }

          done();
        });
    });

    xit('POST /register/:strategy fails with 405 for a non-existent strategy', (done) => {
      request(app)
        .post('/register/pinky-promise')
        .expect(405, done);
    });

    xit('POST /register/github fails with 400 when not enough data is supplied', (done) => {
      request(app)
        .post('/register/github', {})
        .set('Accept', 'application/json')
        .expect(400, done);
    });

    xit('POST /register/github allows registration through github and returns user data', (done) => {
      let github_user = {

      };

      request(app)
        .post('/register/github', github_user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          let body = res.body;

          assert.isDefined(body);
          assert.isDefined(body.user && body.user._id);

          done();
        });
    });

    xit('POST /register/github fails with 409 when user is already registered');
  });

  describe('Session api', () => {
    xit('starts an annonymous user session');
    xit('starts an authenticated session');
    xit('ends an authenticated session');
    xit('stores authenticated session in redis');
  });

  describe('Authentication middleware', () => {
    xit('secures an authenticated user route');
    xit('secures an admin route');
  });
};
