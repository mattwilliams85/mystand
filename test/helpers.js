'use strict';

var fs = require('fs');
///// Load env variables from .env.test file (This will NOT overwrite existing env vars)
var envFilePath = __dirname + '/../.env.test';
if (fs.existsSync(envFilePath)) {
  var env = require('node-env-file');
  env(envFilePath);
}

global.chai = require('chai');
global.expect = global.chai.expect;
global.sinon = require('sinon');

var sinonChai = require('sinon-chai');
global.chai.use(sinonChai);

global.request = require('supertest');

global.DatabaseCleaner = require(__dirname + '/../lib/DatabaseCleaner')();
global.Factory = require('./factory')();

global.agent = {}; // Actual agent will be defined in test/hooks.js
global.csrfToken = ''; // Actual csrfToken will be defined in test/hooks.js

global.resetCSRF = function(done) {
  agent.get('/').end(function(err, res) {
    var regExp = /\_csrf\:\ \"([^"]+)/g;
    csrfToken = regExp.exec(res.text)[1];

    done(err);
  });
};

global.withSignIn = function(userData, cb) {
  if (typeof(userData) === 'function') {
    cb = userData;
    userData = {};
  }
  var data = {
    email: 'email@example.com',
    password: 'password',
    password_confirmation: 'password'
  };
  for (var key in userData) { data[key] = userData[key]; }

  async.series([
    Factory.create('user', data)
  ], function(err, factoryData) {
    resetCSRF(function() {
      agent
      .post('/login.json')
      .send({_csrf: csrfToken, email: data.email, password: data.password})
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        return cb(null, factoryData[0]);
      });
    });
  });
};

global.formattedDate = function(date) {
  return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
};

global.daysFromDate = function(date, days) {
  var dateFrom = date;
  var dateTo = new Date(dateFrom);
  dateTo.setDate(dateFrom.getDate() + days);
  return dateTo;
};
