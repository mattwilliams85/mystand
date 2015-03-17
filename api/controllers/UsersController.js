/*global User: true */
'use strict';

/**
 * UsersController.js
 *
 */

module.exports = {

  /**
   * @api {post} /users Sign Up
   * @apiName PostUsers
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
