'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let helmet = require('helmet');
let loader = require('../helpers/loader');

// TODO: use the loader helper to load these
let active_strategies = loader('/auth/strategies').map((module) => {
  let strategy = module.File;

  return {
    name: strategy.name,
    endpoint: strategy.endpoint,
    router: strategy.router,
    data: strategy.authData || null
  };
});

/**
 * Returns an express router to handle auth endpoints.
 * Receives an instance of the main express app.
*/
module.exports = (app) => {
  let router = express.Router();

  router.use(helmet());
  router.use(bodyParser.json());

  /** Show active strategies */
  router.get('/register', showActiveStrategies);

  /** Make sure strategy is defined and active */
  router.post('/register/:strategy', isActiveStrategy);

  /** Mount the strategy-specific router */
  active_strategies.forEach((strategy) => {
    router.use('/register/' + strategy.endpoint, strategy.router);
  });

  return router;
};

function showActiveStrategies (req, res) {
  let strategies = active_strategies.map((strategy) => {
    return {
      name: strategy.name,
      callback: '/register/' + strategy.endpoint,
      data: strategy.data
    };
  });

  res.status(200).json(strategies);
}

function isActiveStrategy (req, res, next) {
  let active = false;

  active_strategies.forEach((strategy) => {
    if (req.params.strategy.toString() === strategy.endpoint) {
      active = true;
    }
  });

  if (active === true) {
    next();
  } else {
    res.sendStatus(405).end();
  }
}
