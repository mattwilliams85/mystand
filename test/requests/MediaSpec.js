'use strict';

var joi = require('joi');

var uploaderConfigSchema = joi.object({
  config: joi.object({
    key: joi.string().regex(/^uploads\/[\w\-]+\/\$\{filename\}$/).required(),
    awsAccessKeyId: joi.string().required(),
    s3Policy: joi.string().min(200).required(),
    s3Signature: joi.string().min(10).required(),
    s3Bucket: joi.string().min(10).required(),
    acl: joi.string().required()
  })
});

describe('GET /uploader-config.json', function() {
  beforeEach(function(done) {
    DatabaseCleaner.clean(['users'], function() {
      done();
    });
  });

  describe('when user is signed in', function() {
    beforeEach(function(done) {
      withSignIn(function() {
        done();
      });
    });

    it('should return uploader config object', function(done) {
      agent
      .get('/uploader-config.json')
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        var validation = uploaderConfigSchema.validate(res.body);
        expect(validation.error).to.be.null;
        done();
      });
    });
  });

  it('should return 403 forbidden', function(done) {
    agent
    .get('/uploader-config.json')
    .end(function(err, res) {
      expect(res.statusCode).to.eql(403);
      expect(Object.keys(res.body).length).to.equal(0);
      done();
    });
  });
});
