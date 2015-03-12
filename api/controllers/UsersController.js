/*global User: true */
'use strict';

/**
 * UsersController.js
 *
 */

module.exports = {
  create: function(req, res) {
    User.create({
      email: req.body.email,
      password: req.body.password
    })
    .exec(function(err, user) {
      if (err) return res.status(500).json({error: err.invalidAttributes});

      res.json({user: user.toJSON()});
    });
  }
};
