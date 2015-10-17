'use strict';

let express = require('express');
let Router = express.Router();

Router.post('/', (req, res) => {
  if (!req.body.code) {
    res.sendStatus(400).end();
  } else {
    // TODO: get the token
    res.sendStatus(200).end();
  }
});

exports.name = 'Github';
exports.endpoint = 'github';
exports.router = Router;
