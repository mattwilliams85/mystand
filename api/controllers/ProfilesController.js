/*global User: true */
'use strict';

/**
 * ProfilesController.js
 *
 */

module.exports = {
  show: function(req, res) {
    User.auth(req.session.user, function(err, currentUser) {
      if (err) return res.status(401).end();

      res.json({user: currentUser.toJSON()});
    });
  }
};
