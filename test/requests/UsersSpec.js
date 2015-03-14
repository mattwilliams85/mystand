'use strict';

var joi = require('joi');

var userSchema = joi.object({
  user: joi.object({
    id: joi.number().integer().required(),
    email: joi.string().required(),
    first_name: joi.string().allow(null),
    last_name: joi.string().allow(null)
  })
});

describe('POST /users', function() {
  var factoryData,
      email,
      password;

  beforeEach(function(done) {
    email = 'example@example.com';
    password = 'password';

    DatabaseCleaner.clean(['users'], function() {
      done();
    });
  });

  it('should return created user object', function(done) {
    agent
      .post('/users')
      .send({_csrf: csrfToken, email: email, password: password})
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        var validation = userSchema.validate(res.body);
        expect(validation.error).to.be.null;
        expect(res.body.user.email).to.equal(email);
        done();
      });
  });

  describe('email uniqueness', function() {
    beforeEach(function(done) {
      async.series([
        Factory.create('user', {email: email, password: password})
      ], function(err, data) {
        factoryData = data;
        done();
      });
    });

    it('should return an error', function(done) {
      agent
        .post('/users')
        .send({_csrf: csrfToken, email: email, password: password})
        .end(function(err, res) {
          expect(res.statusCode).to.equal(500);
          expect(res.body.error.email[0].message).to.equal('A record with that `email` already exists (`example@example.com`).');
          done();
        });
    });
  });
});
