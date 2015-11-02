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

  // mount the users api
  router.use('/users', UsersApi(Controllers.User));

  return router;
};

  /**
   * @apiDefine authorized Bearer Token Required
   * Authorization header and with valid bearer token is required to complete this request.
  */

  /**
   * @apiDefine admin Administrator Users Only
   * The authorization token and the database user must contain administrator credentials.
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
