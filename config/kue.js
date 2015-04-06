'use strict';

var kue = require('kue'),
    redisConfig = require(__dirname + '/../lib/RedisClient').config(),
    kueEngine = kue.createQueue({
      prefix: 'kue',
      redis: {
        port: redisConfig.port,
        host: redisConfig.host,
        auth: redisConfig.auth,
        db: redisConfig.db
      }
    });

process.once('SIGTERM', function(sig) {
  kueEngine.shutdown(function (err) {
    console.log('Kue is shut down.', err || '');
    process.exit(0);
  }, 5000);
});

module.exports.kue = kueEngine;
