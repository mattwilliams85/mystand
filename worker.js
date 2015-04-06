'use strict';

var kue = require('kue');

var fs = require('fs');
///// Load env variables from .env file (This will NOT overwrite existing env vars)
var envFilePath = __dirname + '/.env';
if (fs.existsSync(envFilePath)) {
  var env = require('node-env-file');
  env(envFilePath);
}
//

require('sails').load({
  hooks: {
    blueprints: false,
    controllers: false,
    cors: false,
    csrf: false,
    grunt: false,
    http: false,
    i18n: false,
    logger: false,
    policies: false,
    // pubsub: require('pubsub-emitter'),
    pubsub: false,
    request: false,
    responses: false,
    session: false,
    sockets: false,
    views: false
  }
}, function(err, app) {
  sails.log.info('Starting kue ...');
  var kueEngine = sails.config.kue;

  // Register kue
  sails.log.info('Registering jobs ...');
  var jobs = require('include-all')({
    dirname     :  __dirname +'/jobs',
    filter      :  /(.+)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    optional    :  true
  });

  for (var name in jobs) {
    sails.log.info('Registering kue handler: ' + name);
    kueEngine.process(name, jobs[name]);
  }

  kueEngine.on('job complete', function(id) {
    sails.log.info('Removing completed job: ' + id);
    kue.Job.get(id, function(err, job) {
      job.remove();
    });
  });

  process.once('SIGTERM', function (sig) {
    kueEngine.shutdown(function (err) {
      console.log('Kue is shut down.', err || '');
      process.exit(0);
    }, 5000);
  });
});
