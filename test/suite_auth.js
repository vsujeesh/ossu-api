/* global describe xit */
'use strict';

module.exports = (app) => {
  // let db = app.get('db');

  describe('Registration api', () => {
    xit('allows registration through github');
    xit('saves user data on registration');
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
