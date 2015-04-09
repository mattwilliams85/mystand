/*global User: true */
'use strict';

var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google-oauth2').Strategy,
    uuid = require('node-uuid');

function findById(id, cb) {
  User.findOneById(id).exec(function(err, user) {
    if (err) return cb();

    cb(null, user);
  });
}

function findByFacebookId(id, cb) {
  User.findOne({facebook_id: id}).exec(function(err, user) {
    sails.log.info('Passport calling findByFacebookId: ', err, user);
    if (err) return cb();

    cb(null, user);
  });
}

function findByGoogleId(id, cb) {
  User.findOne({google_id: id}).exec(function(err, user) {
    sails.log.info('Passport calling findByGoogleId: ', err, user);
    if (err) return cb();

    cb(null, user);
  });
}

function findByEmail(email, cb) {
  if (!email) return cb('Email is not set');

  User.findOne({email: email}).exec(function(err, user) {
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

// Facebook strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: 'http://' + process.env.AUTH_CALLBACK_HOST_WITH_PORT + '/auth/facebook/callback',
  enableProof: false
}, function (accessToken, refreshToken, profile, done) {
  findByFacebookId(profile.id, function (err, user) {
    if (user) return done(null, user);

    findByEmail(profile._json.email, function (err, user) {
      sails.log.info('Passport calling findByEmail: ', err, user);
      if (err) return done(err);

      if (user) {
        // If user was found by email we update facebook_id
        User.update({id: user.id}, {facebook_id: profile.id}, function(err) {
          sails.log.info('Passport updating facebook_id: ', err);
          if (err) return done(err);

          return done(null, user);
        });
      } else {
        // Create a new User if it doesn't exist yet
        var password = uuid.v4();
        User.create({
          facebook_id: profile.id,
          email: profile._json.email,
          password: password,
          password_confirmation: password,
          first_name: profile._json.first_name,
          last_name: profile._json.last_name,
          image_original_url: 'http://graph.facebook.com/' + profile.id + '/picture?type=normal'
        }).exec(function(err, user) {
          if (err || !user) return done(err);

          done(null, user);
        });
      }
    });

  });
}));

// Google strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://' + process.env.AUTH_CALLBACK_HOST_WITH_PORT + '/auth/google/callback',
  passReqToCallback: true
}, function(request, accessToken, refreshToken, profile, done) {
  findByGoogleId(profile.id, function (err, user) {
    if (user) return done(null, user);

    findByEmail(profile.email, function (err, user) {
      sails.log.info('Passport calling findByEmail: ', err, user);
      if (err) return done(err);

      if (user) {
        // If user was found by email we update google_id
        User.update({id: user.id}, {google_id: profile.id}, function(err) {
          sails.log.info('Passport updating google_id: ', err);
          if (err) return done(err);

          return done(null, user);
        });
      } else {
        // Create a new User if it doesn't exist yet
        var password = uuid.v4();
        User.create({
          google_id: profile.id,
          email: profile.email,
          password: password,
          password_confirmation: password,
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          image_original_url: profile.photos[0].value
        }).exec(function(err, user) {
          if (err || !user) return done(err);

          done(null, user);
        });
      }
    });

  });
}));
