/*global User: true */
'use strict';

/**
 * SessionsController.js
 *
 */

var bcrypt = require('bcrypt');
var passport = require('passport');

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
    User.findOne({email: req.body.email}).exec(function(err, user) {
      if (err) return res.status(500).json({error: 'Database error'});
      if (!user) return res.status(404).json({error: 'Invalid email or password'});

      bcrypt.compare(req.body.password, user.password, function(err, match) {
        if (err || !match) return res.status(404).json({error: 'Invalid email or password'});

        req.session.user = user.id;
        req.session.authenticated = true;
        res.json({user: user.toJSON()});
      });
    });
  },

  /**
   * @api {delete} /login Sign Out
   * @apiName DeleteLogin
   * @apiGroup Users
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {}
   */
  destroy: function(req, res) {
    req.session.user = null;
    req.session.authenticated = false;
    return res.status(200).end();
  },

  /**
   * @api {get} /auth/facebook Facebook Auth
   * @apiName LoginFacebook
   * @apiGroup Users
   */
  facebook: function(req, res, next) {
    passport.authenticate('facebook', {scope: ['email', 'public_profile']}, function(err, user) {
      // Request will be redirected to Facebook for authentication,
      // so this function will not be called.
    })(req, res, next);
  },

  /**
   * @api {get} /auth/facebook/callback Facebook Auth Callback
   * @apiName LoginFacebookCallback
   * @apiGroup Users
   */
  facebookCallback: function(req, res, next) {
    passport.authenticate('facebook', function(err, user) {
      if (err) {
        res.redirect('/sign-up');
      } else {
        req.session.user = user.id;
        req.session.authenticated = true;
        res.redirect('/welcome');
      }
    })(req, res, next);
  },

  /**
   * @api {get} /auth/google Google Auth
   * @apiName LoginGoogle
   * @apiGroup Users
   */
  google: function(req, res, next) {
    passport.authenticate('google', {scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read'
    ]})(req, res, next);
  },

  /**
   * @api {get} /auth/google/callback Google Auth Callback
   * @apiName LoginGoogleCallback
   * @apiGroup Users
   */
  googleCallback: function(req, res, next) {
    passport.authenticate('google', function(err, user) {
      if (err) {
        res.redirect('/sign-up');
      } else {
        req.session.user = user.id;
        req.session.authenticated = true;
        res.redirect('/welcome');
      }
    })(req, res, next);
  }
};
