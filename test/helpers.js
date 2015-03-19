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
