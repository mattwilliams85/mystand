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

describe('POST /login.json', function() {
  var factoryData,
      email,
      password;

  beforeEach(function(done) {
    email = 'example@example.com';
    password = 'passw0RD';

    DatabaseCleaner.clean(['users'], function() {
      async.series([
        Factory.create('user', {email: email, password: password})
      ], function(err, data) {
        factoryData = data;
        done();
      });
    });
  });

  it('should return user object on success', function(done) {
    agent
      .post('/login.json')
      .send({_csrf: csrfToken, email: email, password: password})
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        var validation = userSchema.validate(res.body);
        expect(validation.error).to.be.null;
        expect(res.body.user.email).to.equal(email);
        done();
      });
  });

  it('should return 404 on fail', function(done) {
    agent
      .post('/login.json')
      .send({_csrf: csrfToken, email: email, password: 'wrongpassword'})
      .end(function(err, res) {
        expect(res.statusCode).to.eql(404);
        expect(res.body.error).to.equal('Invalid email or password');
        done();
      });
  });
});


describe('DELETE /login.json', function() {
  var email,
      password;

  beforeEach(function(done) {
    email = 'example@example.com';
    password = 'passw0RD';

    DatabaseCleaner.clean(['users'], function() {
      async.series([
        Factory.create('user', {email: email, password: password})
      ], function() {
        done();
      });
    });
  });

  describe('when user is signed in', function() {
    beforeEach(function(done) {
      // Real sign in process
      agent
        .post('/login.json')
        .send({_csrf: csrfToken, email: email, password: password})
        .end(function(err, res) {
          expect(res.statusCode).to.eql(200);
          done();
        });
    });

    it('should sign user out', function(done) {
      agent
        .del('/login.json')
        .send({_csrf: csrfToken})
        .end(function(err, res) {
          expect(res.statusCode).to.eql(200);
          expect(Object.keys(res.body).length).to.equal(0);

          // User should be signed out by now
          agent
            .get('/profile.json')
            .end(function(err, res) {
              expect(res.statusCode).to.eql(403);
              expect(Object.keys(res.body).length).to.equal(0);
              done();
            });
        });
    });
  });
});
