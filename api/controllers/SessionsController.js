/*global User: true */
'use strict';

/**
 * SessionsController.js
 *
 */

var bcrypt = require('bcrypt');

module.exports = {

  /**
   * @api {post} /login Sign In
   * @apiName PostLogin
   * @apiGroup Users
   *
   * @apiParam {String} email User's email.
   * @apiParam {String} password User's password.
   *
   * @apiSuccess {Object} user User profile information.
   * @apiSuccess {Number} user.id ID.
   * @apiSuccess {String} user.email Email.
   * @apiSuccess {String} user.first_name First Name.
   * @apiSuccess {String} user.last_name Last Name.
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *     "user": {
   *       "id": 123,
   *       "email": "user@example.com",
   *       "first_name": "Bob",
   *       "last_name": "Smith"
   *     }
   *   }
   */
  create: function(req, res) {
    User.findOne().where({email: req.body.email}).then(function(user) {
      if (!user) return res.status(404).json({error: 'Invalid email or password'});

      bcrypt.compare(req.body.password, user.password, function(err, match) {
        if (err || !match) return res.status(404).json({error: 'Invalid email or password'});

        req.session.user = user.id;
        res.json({user: user.toJSON()});
      });
    }).catch(function() {
      return res.status(500).json({error: 'Database error'});
    });
  }
};
