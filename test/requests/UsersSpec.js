/*global User: true, UserProfile: true */
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
  var email,
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


describe('PUT /users/:id.json', function() {
  var user, updateUserData;

  beforeEach(function(done) {
    updateUserData = {
      _csrf: csrfToken,
      email: 'newemail@example.com',
      password: 'newpassword',
      password_confirmation: 'newpassword',
      first_name: 'Chad',
      last_name: 'Whiteface',
      image_original_url: 'http://example.com/newone.png',
      bio: 'mahalo',
      website: 'http://chadwhiteface.com'
    };

    DatabaseCleaner.clean(['users', 'user_profiles'], function() {
      withSignIn(function(err, data) {
        user = data;
        // Create user profile
        async.series([
          Factory.create('userProfile', {user: user.id})
        ], function(err, data) {
          // Updating user with profile id
          User.update({id: user.id}, {profile: data[0].id}).exec(function(err, users) {
            if (err) throw 'Can\'t update user';

            user = users[0];
            done();
          });
        });
      });
    });
  });

  it('should return 200 on success fdgdkjvdfhjvgdfhv', function(done) {
    agent
    .put('/users/' + user.id + '.json')
    .send(updateUserData)
    .end(function(err, res) {
      expect(res.statusCode).to.eql(200);
      expect(Object.keys(res.body).length).to.equal(0);

      User.findOneById(user.id).exec(function(err, user) {
        expect(user.email).to.eql(updateUserData.email);
        expect(user.first_name).to.eql(updateUserData.first_name);
        expect(user.last_name).to.eql(updateUserData.last_name);
        expect(user.image_original_url).to.eql(updateUserData.image_original_url);

        UserProfile.findOneById(user.profile).exec(function(err, userProfile) {
          expect(userProfile.bio).to.eql(updateUserData.bio);
          expect(userProfile.website).to.eql(updateUserData.website);

          done();
        });
      });
    });
  });

  it('should return 403 forbidden if updating other user', function(done) {
    agent
    .put('/users/123.json')
    .send(updateUserData)
    .end(function(err, res) {
      expect(res.statusCode).to.eql(403);
      expect(Object.keys(res.body).length).to.equal(0);
      done();
    });
  });
});


describe('GET /users/:id.json', function() {
  var user;

  beforeEach(function(done) {
    DatabaseCleaner.clean(['users', 'user_profiles'], function() {
      async.series([
        Factory.create('user'),
        Factory.create('user')
      ], function(err, data) {
        user = data[0];
        // Create user profile
        async.series([
          Factory.create('userProfile', {user: user.id}),
          Factory.create('userProfile')
        ], function(err, data) {
          // Updating user with profile id
          User.update({id: user.id}, {profile: data[0].id}).exec(function(err) {
            if (err) throw 'Can\'t update user';

            done();
          });
        });
      });
    });
  });

  it('should return public user object hjghjgjhgh', function(done) {
    agent
      .get('/users/' + user.id + '.json')
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        var validation = userPublicSchema.validate(res.body);
        expect(validation.error).to.be.null;
        expect(res.body.user.id).to.equal(user.id);
        done();
      });
  });
});
