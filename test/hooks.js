'use strict';

var Sails = require('sails');

global.agent = {}; // Actual agent will be defined on sails lift callback in this file
global.csrfToken = ''; // Actual csrfToken will be defined on sails lift callback in this file

before(function(done) {
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
    // Request csrftoken
    agent.get('/').end(function(err, res) {
      var regExp = /\_csrf\:\ \"([^"]+)/g;
      csrfToken = regExp.exec(res.text)[1];

      done(err, sails);
    });
  });
});

after(function(done) {
  // Here you can clear fixtures, etc.
  Sails.lower(done);
});
