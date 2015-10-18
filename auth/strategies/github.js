'use strict';

let express = require('express');
let Router = express.Router();
let AuthHelper = require('../../helpers/auth');

Router.use(AuthHelper.cors);

Router.post('/', (req, res) => {
  if (!req.body.code) {
    res.sendStatus(400).end();
  } else {
    // TODO: get the token
    res.sendStatus(200).end();
  }
});

/** Export strategy information*/

exports.name = 'Github';
exports.endpoint = 'github';
exports.router = Router;
exports.authData = {
  client_id: process.env.GITHUB_CLIENT_ID || null,
  scope: 'user:email'
};
