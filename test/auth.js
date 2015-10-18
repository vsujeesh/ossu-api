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
    it('GET /auth describes available registration strategies that have a name and an endpoint', (done) => {
      request(app)
        .get('/auth')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body[0]).to.exist;
          expect(res.body[0]['name']).to.exist;
          expect(res.body[0]['callback']).to.exist;
          expect(res.body[0]['data']).to.exist;
          expect(res.body[0]['data']['client_id']).to.not.be.null;
          expect(res.body[0]['data']['scope']).to.exist;
          done();
        });
    });

    it('POST /auth/:strategy fails with 405 for a non-existent strategy', (done) => {
      request(app)
        .post('/auth/pinky-promise')
        .expect(405, done);
    });

    it('POST /auth/github fails with 400 when not enough data is supplied', (done) => {
      request(app)
        .post('/auth/github', {})
        .set('Accept', 'application/json')
        .expect(400, done);
    });

    xit('POST /auth/github allows authentication through github and returns user data', (done) => {
      // How do we test this???
      // The route requires a `code`, which we can only get from github and that requires use interation (ie: click a button with the mouse)
    });
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
