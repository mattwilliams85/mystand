'use strict';

module.exports = function (job, done) {
  console.log('here we go, processing -------------------------------', job.data);
  done();
};
