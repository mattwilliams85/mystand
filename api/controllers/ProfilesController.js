/*global User: true */
'use strict';

/**
 * ProfilesController.js
 *
 */

module.exports = {

  /**
   * @api {get} /profile Get Current User's Profile
   * @apiName GetProfile
   * @apiGroup Users
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
  show: function(req, res) {
    User.auth(req.session.user, function(err, currentUser) {
      if (err) return res.forbidden();

      var userData = currentUser.toJSON();
      userData.is_admin = !!currentUser.is_admin;
      res.json({user: userData});
    });
  }
};
