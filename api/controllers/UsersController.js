/*global User: true */
'use strict';

/**
 * UsersController.js
 *
 */

module.exports = {

  /**
   * @api {get} /users/:id Show User
   * @apiName GetUser
   * @apiGroup Users
   *
   * @apiParam {Number} id User ID
   *
   * @apiSuccess {Object} user User object
   * @apiSuccess {Number} user.id User ID
   * @apiSuccess {String} user.first_name First name
   * @apiSuccess {String} user.last_name Last name
   * @apiSuccess {String} user.website Website
   * @apiSuccess {Number} user.stands_count Created stands count
   * @apiSuccess {Number} user.score Activism score
   * @apiSuccess {String} user.bio Bio
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *     "user": {
   *       "id": 123,
   *       "first_name": "Bob",
   *       "last_name": "White",
   *       "website": "http://www.google.com/",
   *       "stands_count": 5,
   *       "score": 100,
   *       "bio": "Bio here ..."
   *     }
   *   }
   */
  show: function(req, res) {
    User.findOneById(req.param('id')).populate('profile').exec(function(err, user) {
      if (err) {
        console.log(err);
        return res.status(500).json({error: 'Database error'});
      }

      return res.json({user: user.toJSON({publicProfile: true})});
    });
  },


  /**
   * @api {post} /users Sign Up
   * @apiName PostUsers
   * @apiGroup Users
   *
   * @apiParam {String} email User's email.
   * @apiParam {String} password Password
   * @apiParam {String} password_confirmation Password confirmation
   * @apiParam {String} first_name First name
   * @apiParam {String} last_name Last name
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
      password: req.body.password,
      password_confirmation: req.body.password_confirmation,
      first_name: req.body.first_name,
      last_name: req.body.last_name
    })
    .exec(function(err, user) {
      if (err) return res.status(500).json({error: err.Errors});

      sails.config.kue.create('signUpEmailConfirmation', {
        email: user.email
      }).save(function() {
        res.json({user: user.toJSON()});
      });
    });
  }
};
