'use strict';

/**
 * adminAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow Admin user
 *                 Assumes that your login action in one of your controllers sets `req.session.user = (id of a user);`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {
  if (!req.session.authenticated) return res.forbidden();

  User.authAdmin(req.session.user, function(err, user) {
    if (err) return res.forbidden();

    return next();
  });
};
