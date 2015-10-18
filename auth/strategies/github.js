'use strict';

let express = require('express');
let Router = express.Router();
let AuthHelper = require('../../helpers/auth');
let request = require('request');

Router.use(AuthHelper.cors);

Router.post('/', (req, res) => {
  if (!req.body.code) {
    res.sendStatus(400).end();
  } else {
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
      if (error) {
        return res.status(500).send((error) ? error.dsecription : 'Authentication Error.');
      }

      if (body.access_token) {
        request({
          method: 'GET',
          uri: 'https://api.github.com/user',
          headers: {
            'User-Agent': process.env.GITHUB_APP_NAME || 'OSS-API',
            Authorization: 'token ' + body.access_token
          }
        }, (error, response, body) => {
          if (error) {
            return res.status(500).send('Could not retreive user data.');
          }
          // TODO: check user database
            // New user? Create record, create token
            // Current user? refresh json token
          // TODO: return a JSON web token
          res.status(200).send(body);
        });
      } else {
        res.status(500).send('Unknown error.');
      }
    });
  }
});

/** Export strategy information*/
exports.strategy = {
  name: 'Github',
  endpoint: 'github',
  router: Router,
  url: 'https://github.com/login/oauth/authorize',
  data: {
    client_id: process.env.GITHUB_CLIENT_ID || null,
    scope: 'user:email'
  }
};
