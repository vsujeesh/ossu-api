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
    }, (err, r, body) => {
      if (err) {
        return res.status(500).send((err) ? err.dsecription : 'Unknown Error.');
      }

      if (body.access_token) {
        res.status(200).send(body);
      }
    });
  }
});

/** Export strategy information*/
exports.name = 'Github';
exports.endpoint = 'github';
exports.router = Router;
exports.url = 'https://github.com/login/oauth/authorize';
exports.data = {
  client_id: process.env.GITHUB_CLIENT_ID || null,
  scope: 'user:email'
};
