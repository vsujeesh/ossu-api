/* global describe it before */
'use strict';
let request = require('supertest');
let expect = require('chai').expect;
/**
 * Tests for the Auth suite.
 * Receives an instance of the database, loaded with models.
 * Should create its own express app to use the router in auth/index
 */
module.exports = (app, db) => {
  before((done) => {
    db.User.remove((err) => {
      if (err) {
        done(err);
      }
      done();
    });
  });

  describe('Authentication API', () => {
    describe('GET /auth', () => {
      it('Describes available authorization strategies.', (done) => {
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
    });

    describe('POST /auth/:strategy', () => {
      it('Fails with 405 for a non-existent strategy', (done) => {
        request(app)
          .post('/auth/pinky-promise')
          .expect(404, done);
      });

      describe('Github', () => {
        it('Fails with 400 when a code is not supplied', (done) => {
          request(app)
            .post('/auth/github', {})
            .set('Accept', 'application/json')
            .expect(400, done);
        });

        describe.skip('Middleware', () => {
          describe('getAccessToken', () => {
            it('Expects a "code" in the request body');
            it('Returns 401 when the Github access token cannot be requested');
            it('Sets req.user to the Github access token and calls the next middleware');
          });

          describe('findUserData', () => {
            it('Expects a value in req.user');
            it('Expects a valid Github access token in req.user');
            it('Registers a new user');
            it('Finds an existing user');
            it('Sets a User model in req.user and calls the next middleware');
          });
        });
      });
    });
  });

  describe.skip('Middleware', () => {
    describe('isActiveUser', () => {
      it('Expects a user in the request object');
      it('Returns 403 when the user is not active');
      it('Calls the next middleware when the user is active');
    });

    describe('issueAccessToken', () => {
      it('Expects a user in the request object.');
      it('Requires the server to have a JWT secret');
      it('Returns a json web token');
    });

    describe('verifyToken', (done) => {
      it('Requires the server to have a JWT secret');
      it('Requires a Bearer Authorization header');
      it('Returns 401 when verification fails');
      it('Calls the next middleware when verification is successful.');
    });
  });
};
