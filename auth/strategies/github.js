'use strict';

let express = require('express');
let AuthHelper = require('../../helpers/auth');
let request = require('request');

/** Export strategy information*/
exports.strategy = {
  name: 'Github',
  endpoint: 'github',
  router: setupRouter,
  url: 'https://github.com/login/oauth/authorize',
  data: {
    client_id: process.env.GITHUB_CLIENT_ID || null,
    scope: 'user:email'
  }
};

function setupRouter (db) {
  let Router = express.Router();
  // let UserModel = db.User;

  Router.use(AuthHelper.cors);

  Router.post('/', (req, res, next) => {
    if (!req.body.code) {
      res.sendStatus(400).end();
    } else {
      // get a github token using the code
      request({
        method: 'POST',
        uri: 'https://github.com/login/oauth/access_token',
        body: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: req.body.code
        },
        json: true
      }, (error, response, body) => {
        if (error || !body.access_token) {
          return res.status(500).send((error) ? error.dsecription : 'Authentication Error.');
        }

        // add the token to the request
        req.user = body.access_token;
        // move to the next handler
        next();
      });
    }
  });

  Router.post('/', (req, res, next) => {
    if (!req.user) {
      return res.status(500).send('Unknown authentication error.');
    }

    request({
      method: 'GET',
      uri: 'https://api.github.com/user',
      headers: {
        'User-Agent': process.env.GITHUB_APP_NAME || 'OSS-API',
        Authorization: 'token ' + req.user
      }
    }, (error, response, body) => {
      if (error || !body.id) {
        return res.status(500).send('Could not retreive user data.');
      }

      // TODO: check user database
        // New user? Create record, create token
        // Current user? refresh json token
      // TODO: return a JSON web token
      res.status(200).send(body);
    });
  });

  return Router;
}
