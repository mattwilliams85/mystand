/*global User: true */
'use strict';

var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    uuid = require('node-uuid');

function findById(id, cb) {
  User.findOneById(id).exec(function(err, user) {
    if (err) return cb();

    cb(null, user);
  });
}

function findByFacebookId(id, cb) {
  User.findOne({
    facebook_id: id
  }).exec(function(err, user) {
    if (err) return cb();

    cb(null, user);
  });
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: 'http://' + process.env.AUTH_CALLBACK_HOST_WITH_PORT + '/auth/facebook/callback',
  enableProof: false
}, function (accessToken, refreshToken, profile, done) {
  findByFacebookId(profile.id, function (err, user) {
    if (user) return done(null, user);

    // Create a new User if it doesn't exist yet
    var password = uuid.v4();
    User.create({
      facebook_id: profile.id,
      email: profile._json.email,
      password: password,
      password_confirmation: password,
      first_name: profile._json.first_name,
      last_name: profile._json.last_name
    }).exec(function(err, user) {
      if (err || !user) return done(err, null);

      done(null, user);
    });
  });
}));