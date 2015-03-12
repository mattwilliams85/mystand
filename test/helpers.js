'use strict';

var fs = require('fs');
///// Load env variables from .env.test file (This will NOT overwrite existing env vars)
var env = require('node-env-file');
env(__dirname + '/../.env.test');


global.chai = require('chai');
global.expect = global.chai.expect;
global.sinon = require('sinon');

var sinonChai = require('sinon-chai');
global.chai.use(sinonChai);

global.request = require('supertest');

global.DatabaseCleaner = require(__dirname + '/../lib/DatabaseCleaner')();
