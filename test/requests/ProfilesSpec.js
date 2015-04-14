'use strict';

var joi = require('joi');

var userSchema = joi.object({
  user: joi.object({
    id: joi.number().integer().required(),
    first_name: joi.string().allow(null),
    last_name: joi.string().allow(null),
    image_original_url: joi.string().allow(null),
    bio: joi.string().allow(null),
    website: joi.string().allow(null),
    stands_count: joi.number().integer().required(),
    score: joi.number().integer().required(),
    email: joi.string().required(),
    is_admin: joi.boolean().required()
  })
});

describe('GET /profile.json', function() {
  var email,
      password;

  beforeEach(function(done) {
    email = 'example@example.com';
    password = 'passw0RD';

    DatabaseCleaner.clean(['users', 'user_profiles'], function() {
      async.series([
        Factory.create('user', {email: email, password: password, password_confirmation: password}),
        Factory.create('user')
      ], function(err, data) {
        // Create user profile
        async.series([
          Factory.create('userProfile', {user: data[0].id})
        ], function() {
          done();
        });
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

    it('should return current user\'s object', function(done) {
      agent
      .get('/profile.json')
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        var validation = userSchema.validate(res.body);
        expect(validation.error).to.be.null;
        expect(res.body.user.email).to.equal(email);
        expect(res.body.user.is_admin).to.equal(false);
        done();
      });
    });
  });

  it('should return 403 forbidden', function(done) {
    agent
      .get('/profile.json')
      .end(function(err, res) {
        expect(res.statusCode).to.eql(403);
        expect(Object.keys(res.body).length).to.equal(0);
        done();
      });
  });
});
