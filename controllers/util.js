/**
 * Utilities.
 * Middleware methods must accept all of the parameters: req, res, and next
 * Non-middleware methods should return an object.
 */
var UtilController = function () {
  /**
   * The request must have a payload that is not empty.
   * Payload can be a non-empty string or array...or an object with at least one property.
   */
  UtilController.prototype.requirePayload = function (req, res, next) {
    if (!req.body) {
      return res.status(400).json(_stdError('Payload is required.'));
    }

    if (req.body instanceof Array && req.body.length === 0) {
      return res.status(400).json(_stdError('Payload cannot be empty.'));
    }

    if (req.body instanceof Object && Object.keys(req.body).length === 0) {
      return res.status(400).json(_stdError('Payload cannot be empty.'));
    }

    next();
  };

  /**
   * The request must accept a JSON response.
   */
  UtilController.prototype.acceptsJSON = function (req, res, next) {
    var Accept = req.get('Accept');

    if (!Accept) {
      return res.status(400).json('Accept header is required.');
    }

    if (Accept.indexOf('application/json') === -1) {
      return res.status(406).json(_stdError('The requested resource returns JSON data.', {
        Accept: 'application/json'
      }));
    }

    next();
  };

  /**
   * Return a standarized error.
   */
  UtilController.prototype.stdError = function (message, data) {
    return _stdError(message, data);
  };

  /**
   * Return a standarized error that can be converted to JSON.
   */
  function _stdError (message, data) {
    return {
      message: message || 'No message.',
      data: data || undefined
    };
  }
};

module.exports = UtilController;
