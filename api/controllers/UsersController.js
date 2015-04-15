/*global User: true, UserProfile: true */
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
   * @apiSuccess {String} user.image_original_url Profile Image
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
   *       "image_original_url": "http://example.com/image.jpg",
   *       "website": "http://www.google.com/",
   *       "stands_count": 5,
   *       "score": 100,
   *       "bio": "Bio here ...",
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
   * @apiSuccess {String} user.first_name First Name.
   * @apiSuccess {String} user.last_name Last Name.
   * @apiSuccess {String} user.image_original_url Profile Image
   * @apiSuccess {String} user.email Email
   * @apiSuccess {Boolean} user.is_admin Is Admin
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *     "user": {
   *       "id": 123,
   *       "first_name": "Bob",
   *       "last_name": "Smith",
   *       "image_original_url": "http://example.com/image.jpg",
   *       "email": "email@example.com",
   *       "is_admin": true
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
    }).exec(function(err, user) {
      if (err) return res.status(500).json({error: err.Errors});

      sails.config.kue.create('signUpEmailConfirmation', {
        email: user.email
      }).save(function() {
        res.json({user: user.toJSON({privateProfile: true})});
      });
    });
  },

  /**
   * @api {put} /users/:id Update User
   * @apiName PutUsers
   * @apiGroup Users
   *
   * @apiParam {String} email User's email.
   * @apiParam {String} password Password
   * @apiParam {String} password_confirmation Password confirmation
   * @apiParam {String} first_name First name
   * @apiParam {String} last_name Last name
   * @apiParam {String} image_original_url Profile image
   * @apiParam {String} bio Bio
   * @apiParam {String} website Website
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {}
   */
  update: function(req, res) {
    var updateUserProfile = function(profileId, callback) {
      var data = {
        bio: req.body.bio,
        website: req.body.website
      };
      // Remove empty keys
      for (var key in data) {
        if (!data[key]) delete data[key];
      }
      UserProfile.update({id: profileId}, data).exec(callback);
    };

    var updateUser = function(userId, callback) {
      var data = {
        email: req.body.email,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        image_original_url: req.body.image_original_url
      };
      // Remove empty keys
      for (var key in data) {
        if (!data[key]) delete data[key];
      }
      User.update({id: userId}, data).exec(callback);
    };

    User.auth(req.session.user, function(err, currentUser) {
      if (err || parseInt(req.param('id')) !== currentUser.id) return res.forbidden();

      updateUser(currentUser.id, function(err) {
        if (err) return res.status(500).json({error: sails.config.models.errorMessagesJson(err)});

        updateUserProfile(currentUser.profile, function(err) {
sails.log.info('err 2 ----', sails.config.models.errorMessagesJson(err));
          if (err) return res.status(500).json({error: sails.config.models.errorMessagesJson(err)});

          return res.status(200).end();
        });
      });
    });
  }
};
