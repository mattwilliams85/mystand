'use strict';

/*
 * RedisClient.js
 *
 */

var redis = require('redis');
var url = require('url');

var configData = url.parse(process.env.REDISGREEN_URL);

/*
 * Create a RedisClient
 *
 * @return {RedisClient}
 */
exports.createClient = function(options) {
  var socket = options.socket;
  var port = !socket ? (options.port || 6379) : null;
  var host = !socket ? (options.host || '127.0.0.1') : null;
  var client = redis.createClient(socket || port, host, options.options );
  if (options.auth) {
    client.auth(options.auth);
  }
  if (options.db) {
    client.select(options.db);
  }
  return client;
};

exports.config = function() {
  var data = {
    port: configData.port,
    host: configData.hostname,
    auth: configData.auth
  };
  var db = configData.pathname.split('/')[1];
  if (db) data.db = db;

  return data;
};

exports.client = function() {
  return exports.createClient(exports.config());
};
