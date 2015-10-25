'use strict';

let express = require('express');
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
exports.getAccessToken = getAccessToken;
exports.findUserData = findUserData;

function setupRouter () {
  let Router = express.Router();

  Router.post('/', getAccessToken);
  Router.post('/', findUserData);

  return Router;
}

/**
 * Use code in request params to generate a github access token.
 * Attach token to req.user.
 * Calls the next handler in the stack.
 */
function getAccessToken (req, res, next) {
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
        return res.status(401).send('Could authenticate Github user.');
      }

      req.user = body.access_token;
      next();
    });
  }
}

/**
 * Use token in req.user to find or create database user.
 * Attach user model to req.user
 * Calls the next handler in the stack.
 */
function findUserData (req, res, next) {
  let UserModel = req.app.get('db').User;

  if (!req.user) {
    return res.status(500).send('Missing Github token.');
  }

  // Get user data from Github api
  request({
    method: 'GET',
    uri: 'https://api.github.com/user',
    headers: {
      'User-Agent': process.env.GITHUB_APP_NAME || 'OSS-API',
      Authorization: 'token ' + req.user
    }
  }, (error, response, body) => {
    let githubUser = JSON.parse(body);

    if (error || !githubUser.id) {
      return res.status(500).send('Could not retreive user data.');
    }

    // Look for a user model
    UserModel.findByGithubId(githubUser.id, (err, user) => {
      if (err) {
        return res.status(500).send('Database error when finding user.');
      }

      if (user.length === 0) {
        // new user
        UserModel.createFromGithub(githubUser, (err, newUser) => {
          if (err) {
            return res.status(500).send('Could not register a new user.');
          }

          req.user = newUser;
          next();

          return;
        });
      } else {
        // current user
        req.user = user[0];
        next();
      }
    });
  });
}
