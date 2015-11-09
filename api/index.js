'use strict';

// load deps
let express = require('express');
let helmet = require('helmet');
let bodyParser = require('body-parser');

// load the routes
let UsersApi = require('./users');

/**
 * Returns an express router to handle api endpoints.
 * Receives an instance of the main express app.
*/
module.exports = (app) => {
  let router = express.Router();
  let db = app.get('db');

  router.use(helmet());
  router.use(bodyParser.json());

  // load controllers
  let Controllers = require('../controllers')(db);

  // Universal API policies
  router.use(Controllers.Util.acceptsJSON);

  // mount the users api
  router.use('/users', UsersApi(Controllers.User));

  return router;
};

  /**
   * @apiDefine user Bearer Token Required
   * The authorization token must belong to an authenticated user.  An Authorization header and with valid bearer token is required to complete this request.
  */

  /**
   * @apiDefine admin Administrator Users Only
   * The authorization token must belong to an administrator. An Authorization header and with valid bearer token is required to complete this request.
   */

  /**
   * @apiDefine NotFoundError
   *
   * @apiError (Error 404) NotFoundError The requested resource was not found.
   *
   * @apiErrorExample NotFoundError
   *     HTTP/1.1 404 Not Found.
   */

  /**
   * @apiDefine UnauthorizedError
   *
   * @apiError UnauthorizedError The provided token is not allowed to consume this resource.
   *
   * @apiErrorExample UnauthorizedError
   *     HTTP/1.1 401 Unauthorized.
   */
