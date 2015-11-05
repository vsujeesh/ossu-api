/*global describe it beforeEach after */
'use strict';

let expect = require('chai').expect;
let request = require('supertest');
let fixture = require('../fixtures/users.json');
let mongoose = require('mongoose');

module.exports = (app, db) => {
  describe('User API', () => {
    // setup the model
    let Model = db.User;
    let user1 = null;
    let user2 = null;

    beforeEach((done) => {
      Model.remove()
        .then(() => {
          user1 = new Model(fixture[0]);
          user2 = new Model(fixture[1]);
        })
        .then(() => { return user1.save(); })
        .then(() => { return user2.save(); })
        .then(() => { done(); });
    });

    after((done) => done());

    describe('GET /users', () => {
      it('should list all users', (done) => {
        request(app)
          .get('/api/users')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res.body[0].name).to.equal(user1.name);
            expect(res.body[1].name).to.equal(user2.name);
            done();
          });
      });
    });

    describe('GET /users/:id', () => {
      it('should get a user by id', (done) => {
        request(app)
          .get('/api/users/' + user1._id)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res.body.name).to.equal(user1.name);
            done();
          });
      });

      it('should return 404 when the user cannot be found', (done) => {
        request(app)
          .get('/api/users/' + mongoose.Types.ObjectId())
          .set('Accept', 'application/json')
          .expect(404, done);
      });

      it('should return 404 when the :id is not a Mongoose ObjectId', (done) => {
        request(app)
          .get('/api/users/123456')
          .set('Accept', 'application/json')
          .expect(404, done);
      });
    });

    describe('POST /users', () => {
      it('should create a user', (done) => {
        let user = new Model(fixture[2]);
        request(app)
          .post('/api/users')
          .set('Accept', 'applicatoin/json')
          .send(user)
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res.body.name).to.equal(user.name);
            done();
          });
      });
      it('should require administrator authorization');
      it('should not create user curriculum data, even if present');
      it('should return 400 when the payload object does not contain all required fields');
      it('should return 400 when the payload contains one or more invalid fields');
      it('should return 400 when the payload is empty or not an object');
      it('should return 404 when the user cannot be found');
      it('should return 404 when the :id is not a Mongoose ObjectId');
    });

    describe('PUT /users/:id', () => {
      it('should update a user\'s name', (done) => {
        let user = { name: 'Marcus Badass Aurelius' };
        request(app)
          .put('/api/users/' + user1._id)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .send(user)
          .expect(200)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res.body.name).to.equal(user.name);
            done();
          });
      });
      it('should require member authorization to edit your own profile');
      it('should require administrator authorization to edit another user\'s profile');
      it('should not update user curriculum data'); // use seperate endpoint
      it('should not update user account data'); // use seperate endpoint
      it('should ignore invalid fields');
      it('should return 400 when the payload object does not contain at least one valid field');
      it('should return 400 when the payload is empty or not an object');
      it('should return 404 when the user cannot be found');
      it('should return 404 when the :id is not a Mongoose ObjectId');
    });

    describe('DELETE /users/:id', () => {
      it('should delete a user', (done) => {
        request(app)
          .delete('/api/users/' + user1._id)
          .expect(204)
          .end((err, res) => {
            expect(err).to.be.null;
            done();
          });
      });
      it('should require member authorization to delete your own profile');
      it('should require administrator authorization to delete another user\'s profile');
      it('should return 404 when the user cannot be found');
      it('should return 404 when the :id is not a Mongoose ObjectId');
    });
  });
};
