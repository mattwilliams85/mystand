/*global User: true, UserProfile: true */
'use strict';

var joi = require('joi');

var userSchema = joi.object({
  id: joi.number().integer().required(),
  first_name: joi.string().allow(null),
  last_name: joi.string().allow(null),
  image_original_url: joi.string().allow(null),
  email: joi.string().required(),
  is_admin: joi.boolean().required(),
  bio: joi.string().allow(null),
  website: joi.string().allow(null),
  stands_count: joi.number().integer().optional(),
  score: joi.number().integer().optional()
});

var usersSchema = joi.object({
  users: joi.array().items(userSchema).required()
});

describe('GET /admin/users.json', function() {
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
          Factory.create('userProfile', {user: user.id})
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

  describe('signed in', function() {
    var signedInUser;

    beforeEach(function(done) {
      withSignIn(function(err, data) {
        signedInUser = data;
        done();
      });
    });

    describe('signed in as Admin', function() {
      beforeEach(function(done) {
        User.update({id: signedInUser.id}, {is_admin: true}).exec(function() {
          done();
        });
      });

      it('should return users list jfgfjhfsdfffgd', function(done) {
        agent
        .get('/admin/users.json')
        .end(function(err, res) {
          expect(res.statusCode).to.eql(200);
          var validation = usersSchema.validate(res.body);
          expect(validation.error).to.be.null;
          expect(res.body.users.length).to.equal(3); // 2 from factory 1 from Sign In helper
          done();
        });
      });
    });

    it('should return 403 forbidden when Not admin', function(done) {
      agent.get('/admin/users.json')
      .end(function(err, res) {
        expect(res.statusCode).to.eql(403);
        expect(Object.keys(res.body).length).to.equal(0);
        done();
      });
    });
  });

  it('should return 403 forbidden when Not signed in', function(done) {
    agent.get('/admin/users.json')
    .end(function(err, res) {
      expect(res.statusCode).to.eql(403);
      expect(Object.keys(res.body).length).to.equal(0);
      done();
    });
  });
});
