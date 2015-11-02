'use strict';

// load deps
let express = require('express');

module.exports = (Controller) => {
  let router = express.Router();
  /**
   * @apiDefine userObject A user object.
   *
   * @apiSuccess {String}   _id             Database object ID.
   * @apiSuccess {String}   username        Fullname of the User.
   * @apiSuccess {String}   email           Email address.
   * @apiSuccess {Object}   github          GitHub Profile info.
   * @apiSuccess {String}   github.nick     User handle.
   * @apiSuccess {String}   github.link     Profile link.
   * @apiSuccess {Object}   twitter         Twitter Profilie info.
   * @apiSuccess {String}   twitter.nick    User handle.
   * @apiSuccess {String}   twitter.link    Feed link.
   * @apiSuccess {Object}   linkedin        LinkedIn Profile info.
   * @apiSuccess {String}   linkedin.nick   User handle.
   * @apiSuccess {String}   linkedin.link   Profile link.
   * @apiSuccess {Object}   website         Website Info.
   * @apiSuccess {String}   website.title   Title.
   * @apiSuccess {String}   website.link    URL.
   * @apiSuccess {Object}   curriculum      Curriculum the user is enrolled in.
   * @apiSuccess {Object}   account         Internal user options
   * @apiSuccess {Object}   location        Location information.
   */

  /**
   * @api {get} /api/user/ List
   * @apiName ListUsers
   * @apiGroup User
   *
   * @apiDescription Fetches a list of user profiles.
   *
   * @apiExample Example usage:
   * curl -H "Content-Type: application/json" http://localhost:8080/api/users/
   *
   * @apiSuccess {Object[]} users           A list of user profiles. See: 'Get User'
   *
   */
  router.get('/', Controller.show);

  /**
   * @api {get} /api/users/:id Get One
   * @apiName GetUser
   * @apiGroup User
   *
   * @apiDescription Fetches a user's profile data.
   *
   * @apiParam {String}     id              User's ID.
   *
   * @apiExample Example usage:
   * curl -H "Content-Type: application/json" http://localhost:8080/api/users/[id]
   *
   * @apiUse userObject
   * @apiUse NotFoundError
   */
  router.get('/:id', Controller.get);

  /**
   * @api {post} /api/users Create
   * @apiName CreateUser
   * @apiGroup User
   * @apiPermission admin
   *
   * @apiDescription Creates a user profile.
   *
   * @apiExample Example usage:
   * curl -H "Content-Type: application/json" -X POST -d '{ "username":"Sam", "email":"samwise@theshire" }' http://localhost:8080/api/users/
   *
   * @apiUse userObject
   * @apiUse NotFoundError
   * @apiUse UnauthorizedError
   */
  router.post('/', Controller.create);

  /**
   * @api {put} /api/users/:id Update
   * @apiName UpdateUser
   * @apiGroup User
   * @apiPermission authorized
   *
   * @apiDescription Updates a user profile.
   *
   * @apiParam   {String}   id              User's ID.
   *
   * @apiExample Example usage:
   * curl -H "Content-Type: application/json" -X PUT -d '{ "username":"Sam", "email":"samwise@theshire" }' http://localhost:8080/api/users/[id]
   *
   * @apiUse userObject
   * @apiUse NotFoundError
   * @apiUse UnauthorizedError
   */
  router.put('/:id', Controller.update);

  /**
   * @api {delete} /api/users/:id Delete
   * @apiName DeleteUser
   * @apiGroup User
   * @apiPermission admin
   * @apiPermission authorized
   *
   * @apiDescription Deletes a user profile.
   *
   * @apiParam   {String}   id              User's ID.
   *
   * @apiExample Example usage:
   * curl -H "Content-Type: application/json" -X DELETE http://localhost:8080/api/users/[id]
   *
   * @apiSuccess (204) body No Content.
   *
   * @apiUse NotFoundError
   * @apiUse UnauthorizedError
   */
  router.delete('/:id', Controller.destroy);

  return router;
};

