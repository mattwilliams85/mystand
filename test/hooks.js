'use strict';

var Sails = require('sails');
global.redisClient = require(__dirname + '/../lib/RedisClient').client();

before(function(done) {
  // Clear Redis db
  redisClient.flushdb();

  Sails.lift({
    // Configuration for testing purposes
    log: {
      level: 'error'
    },
    environment: 'test'
  }, function(err, sails) {
    if (err) return done(err);
    // Here you can load fixtures, etc.
    agent = request.agent(sails.hooks.http.app);
    resetCSRF(function(err) {
      done(err, sails);
    });
  });
});

after(function(done) {
  // Here you can clear fixtures, etc.
  Sails.lower(done);
});
