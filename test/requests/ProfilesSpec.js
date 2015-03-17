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

describe('GET /profile', function() {
  var factoryData,
      email,
      password;

  beforeEach(function(done) {
    email = 'example@example.com';
    password = 'passw0RD';

    DatabaseCleaner.clean(['users'], function() {
      async.series([
        Factory.create('user', {email: email, password: password}),
        Factory.create('user')
      ], function(err, data) {
        factoryData = data;
        done();
      });
    });
  });

  describe('when user is signed in', function() {
    beforeEach(function(done) {
      // Real sign in process
      agent
        .post('/login')
        .send({_csrf: csrfToken, email: email, password: password})
        .end(function(err, res) {
          expect(res.statusCode).to.eql(200);
          done();
        });
    });

    it('should return current user\'s object', function(done) {
      agent
        .get('/profile')
        .end(function(err, res) {
          expect(res.statusCode).to.eql(200);
          var validation = userSchema.validate(res.body);
          expect(validation.error).to.be.null;
          expect(res.body.user.email).to.equal(email);
          done();
        });
    });
  });

  it('should return 401 unauthorized', function(done) {
    agent
      .get('/profile')
      .end(function(err, res) {
        expect(res.statusCode).to.eql(401);
        expect(Object.keys(res.body).length).to.equal(0);
        done();
      });
  });
});
