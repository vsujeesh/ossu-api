'use strict';

let corser = require('corser');
let jwt = require('jsonwebtoken');

/**
 * CORS configuration for use in auth strategies
 */
exports.cors = corser.create({
  origins: ['http://auth.test'],
  methods: ['POST']
});

/**
 * Make sure the user is active.
 * Requires that req.user is an instance of User model.
 */
exports.isActiveUser = (req, res, next) => {
  if (!req.user) {
    return res.status(400).send('No user.');
  }

  if (req.user.account.active !== true) {
    return res.status(403).send('User is not active.');
  }

  next();
};

/**
 * Issue an access token.
 * Assumes user is active (other middlewares will take care of this)
 * Auth strategies should set req.user with an instance of the user model.
 * Returns user model and token string
 */
exports.issueAccessToken = (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(500).send('Missing database user.');
  }

  if (!process.env.JWT_SECRET) {
    return res.status(501).send('Server is not configured to issue authentication tokens.');
  }

  let token = jwt.sign(req.user.tokenPayload(), process.env.JWT_SECRET, {
    expiresIn: '7d',
    algorithm: 'HS512',
    issuer: 'OSS_API'
  });

  res.status(200).json({
    token: token,
    user: req.user
  });
};

/**
 * Validates a token.
 * Attaches user_token_data to the request for further verification.
 * Does not assume anything about context or permisions.
 */
exports.verifyToken = (req, res, next) => {
  let token = req.get('Authorization');
  let verifyOpts = {
    algorithms: 'HS512',
    issuer: 'OSS_API'
  };

  if (!process.env.JWT_SECRET) {
    return res.status(501).send('Server is not configured to verify authentication tokens.');
  }

  if (!token || token.length === 0) {
    return res.status(400).send('Authorization header with valid token is required.');
  }

  if (token.split(' ')[0] !== 'Bearer') {
    return res.status(400).send('Malformed Authorization header.');
  }

  token = token.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, verifyOpts, (err, decoded) => {
    if (err) {
      return res.send(401, err.message || 'Token Verification Error.');
    }

    req.user_token_data = decoded;

    next();
  });
};
