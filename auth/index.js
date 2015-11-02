'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let helmet = require('helmet');
let AuthHelper = require('../helpers/auth');
let loader = require('../helpers/loader');
let active_strategies = loader('/auth/strategies').map((module) => {
  return module.File.strategy;
});

/**
 * Returns an express router to handle auth endpoints.
 * Receives an instance of the main express app.
*/
module.exports = (app) => {
  let router = express.Router();

  router.use(helmet());
  router.use(bodyParser.json());

  /**
   * @api {get} /auth Get Strategies
   * @apiName authGet
   * @apiGroup Auth
   *
   * @apiDescription Get a list of available 3rd-party authentication strategies.
   *
   * @apiSuccess {array}  strategies          A list of available authentication strategies.
   * @apiSuccess {string} strategies.name     The name of the strategy.
   * @apiSuccess {string} strategies.auth_url The URL to intiate the strategy.
   * @apiSuccess {mixed}  strategies.data     The data that should be used when initiating the strategy.
   * @apiSuccess {string} strategies.callback The callback url to complete the strategy.
   */
  router.get('/', showActiveStrategies);

  /**
   * @api {post} /auth/:strategy Finalize Strategy
   * @apiName authFin
   * @apiGroup Auth
   *
   * @apiDescription Finalize a 3rd-party authentication strategy.
   *
   * @apiParam {string} strategy The name of the authentication strategy, provided in 'Get Strategies'.
   * @apiParam {string} code     A code (provided by the authentication strategy) used to complete authentication.
   *
   * @apiSuccess {string} token An authorization token assgned to the authenticated user.
   * @apiSuccess {object} user  A user object. See api: 'User'
   *
   * @apiUse NotFoundError
   * @apiError (Error 500 - Token error)        {string} body Could not retreive user data from authentication provider.
   * @apiError (Error 500 - Database error)     {string} body Database error.
   * @apiError (Error 500 - Registration error) {string} body Could not register a new user
   */
  router.post('/:strategy', isActiveStrategy);

  /** Mount the strategy-specific router */
  active_strategies.forEach((strategy) => {
    // Load a CORS configuration for this strategy
    router.use('/' + strategy.endpoint, AuthHelper.cors);
    // Use the strategy-provided router
    router.use('/' + strategy.endpoint, strategy.router());
    // Make sure the user is active
    router.use('/' + strategy.endpoint, AuthHelper.isActiveUser);
    // Issue a token
    router.use('/' + strategy.endpoint, AuthHelper.issueAccessToken);
  });

  return router;
};

/**
 * Show active strategies
 */
function showActiveStrategies (req, res) {
  let strategies = active_strategies.map((strategy) => {
    return {
      name: strategy.name,
      auth_url: strategy.url,
      data: strategy.data,
      callback: '/auth/' + strategy.endpoint
    };
  });

  res.status(200).json(strategies);
}

/**
 * Make sure strategy is defined and active
 */
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
    res.sendStatus(404).end();
  }
}
