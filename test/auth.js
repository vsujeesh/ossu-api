/* global describe xit it */
'use strict';
let request = require('supertest');
let expect = require('chai').expect;
/**
 * Tests for the Auth suite.
 * Receives an instance of the database, loaded with models.
 * Should create its own express app to use the router in auth/index
 */
module.exports = (app, db) => {
  // before((done) => {
  //   done();
  // });

  describe('Registration api', () => {
    it('GET /auth/register describes available registration strategies that have a name and an endpoint', (done) => {
      request(app)
        .get('/auth/register')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body[0]).to.exist;
          expect(res.body[0]['name']).to.exist;
          expect(res.body[0]['callback']).to.exist;
          done();
        });
    });

    it('POST /auth/register/:strategy fails with 405 for a non-existent strategy', (done) => {
      request(app)
        .post('/auth/register/pinky-promise')
        .expect(405, done);
    });

    it('POST /auth/register/github fails with 400 when not enough data is supplied', (done) => {
      request(app)
        .post('/auth/register/github', {})
        .set('Accept', 'application/json')
        .expect(400, done);
    });

    xit('POST /auth/register/github allows registration through github and returns user data', (done) => {
      // let github_user = {

      // };

      // request(app)
      //   .post('/auth/register/github', github_user)
      //   .set('Accept', 'application/json')
      //   .expect('Content-Type', /json/)
      //   .expect(200)
      //   .end((err, res) => {
      //     if (err) {
      //       return done(err);
      //     }

      //     let body = res.body;

      //     assert.isDefined(body);
      //     assert.isDefined(body.user && body.user._id);

      //     done();
      //   });
    });

    xit('POST /auth/register/github fails with 409 when user is already registered');
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
