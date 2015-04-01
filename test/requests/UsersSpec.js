'use strict';

var joi = require('joi');

var userSchema = joi.object({
  user: joi.object({
    id: joi.number().integer().required(),
    email: joi.string().required(),
    first_name: joi.string().allow(null),
    last_name: joi.string().allow(null),
    image_original_url: joi.string().allow(null)
  })
});

var userPublicSchema = joi.object({
  user: joi.object({
    id: joi.number().integer().required(),
    first_name: joi.string().allow(null),
    last_name: joi.string().allow(null),
    image_original_url: joi.string().allow(null),
    bio: joi.string().allow(null),
    website: joi.string().allow(null),
    stands_count: joi.number().integer().required(),
    score: joi.number().integer().required(),
  })
});

describe('POST /users.json', function() {
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
      .post('/users.json')
      .send({_csrf: csrfToken, email: email, password: password, password_confirmation: password, first_name: 'Bob', last_name: 'Smith'})
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        var validation = userSchema.validate(res.body);
        expect(validation.error).to.be.null;
        expect(res.body.user.email).to.equal(email);
        done();
      });
  });

  describe('requires attributes', function() {
    it('should return error messages', function(done) {
      agent
        .post('/users.json')
        .send({_csrf: csrfToken})
        .end(function(err, res) {
          expect(res.statusCode).to.equal(500);
          expect(res.body.error.email[0].message).to.equal('Provide valid email address');
          expect(res.body.error.password[0].message).to.equal('Password minimum length is 8 characters');
          expect(res.body.error.first_name[0].message).to.equal('First Name is required');
          expect(res.body.error.last_name[0].message).to.equal('Last Name is required');
          done();
        });
    });
  });
});


describe('GET /users/:id.json', function() {
  var factoryData;

  beforeEach(function(done) {
    DatabaseCleaner.clean(['users', 'user_profiles'], function() {
      async.series([
        Factory.create('user'),
        Factory.create('user')
      ], function(err, data) {
        factoryData = data;
        // Create user profile
        async.series([
          Factory.create('userProfile', {user: factoryData[0].id}),
          Factory.create('userProfile')
        ], function() {
          done();
        });
      });
    });
  });

  it('should return public user object', function(done) {
    agent
      .get('/users/' + factoryData[0].id + '.json')
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        var validation = userPublicSchema.validate(res.body);
        expect(validation.error).to.be.null;
        expect(res.body.user.id).to.equal(factoryData[0].id);
        done();
      });
  });
});
