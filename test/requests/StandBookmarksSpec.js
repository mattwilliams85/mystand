'use strict';

var joi = require('joi');

var standSchema = joi.object({
  id: joi.number().integer().required(),
  title: joi.string().required(),
  description: joi.string().required(),
  image_original_url: joi.string().required(),
  youtube: joi.string(),
  goal: joi.number().integer().required(),
  category: joi.number().required(),
  actions_count: joi.number().integer().required(),
  updates_count: joi.number().integer().required(),
  closed_at: joi.number().integer().required()
});

var standsSchema = joi.object({
  stands: joi.array().items(standSchema).required()
});

describe('GET /users/:userId/bookmarks.json', function() {
  var stands,
      standBookmarks,
      user,
      otherUser,
      userData = {
        email: 'bob@example.com',
        password: 'passw0RD',
        password_confirmation: 'passw0RD'
      };

  describe('when user is signed in', function() {
    beforeEach(function(done) {
      DatabaseCleaner.clean(['stands', 'stand_bookmarks', 'users'], function() {
        withSignIn(userData, function(err, data) {
          user = data;

          // Create Other user
          async.series([
            Factory.create('user')
          ], function(err, data) {
            otherUser = data[0];

            // Create stands
            async.series([
              Factory.create('stand', {user: user.id}),
              Factory.create('stand', {user: user.id}),
              Factory.create('stand', {user: user.id})
            ], function(err, data) {
              stands = data;

              // Create bookmarks
              async.series([
                Factory.create('standBookmark', {stand: stands[0].id, user: user.id}),
                Factory.create('standBookmark', {stand: stands[1].id, user: user.id}),
                Factory.create('standBookmark', {stand: stands[1].id, user: 123})
              ], function(err, data) {
                standBookmarks = data;
                done();
              });
            });

          });
        });
      });
    });

    it('should return valid stands data format', function(done) {
      agent.get('/users/' + user.id + '/bookmarks.json')
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        var validation = standsSchema.validate(res.body);
        expect(validation.error).to.be.null;
        done();
      });
    });

    it('should return user\'s bookmarks', function(done) {
      agent.get('/users/' + user.id + '/bookmarks.json')
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        expect(res.body.stands.length).to.eql(2);
        expect(res.body.stands[0].id).to.eql(stands[1].id);
        expect(res.body.stands[1].id).to.eql(stands[0].id);
        done();
      });
    });

    it('should return 403 forbidden if trying to access other user\'s bookmarks', function(done) {
      agent.get('/users/' + otherUser.id + '/bookmarks.json')
      .end(function(err, res) {
        expect(res.statusCode).to.eql(403);
        expect(Object.keys(res.body).length).to.equal(0);
        done();
      });
    });
  });

  describe('when user is NOT signed in', function() {
    beforeEach(function(done) {
      DatabaseCleaner.clean(['users'], function() {
        async.series([
          Factory.create('user')
        ], function(err, data) {
          user = data[0];
          done();
        });
      });
    });

    it('should return 403 forbidden', function(done) {
      agent.get('/users/' + user.id + '/bookmarks.json')
      .end(function(err, res) {
        expect(res.statusCode).to.eql(403);
        expect(Object.keys(res.body).length).to.equal(0);
        done();
      });
    });
  });
});


describe('POST /stands/:standId/bookmarks.json', function() {
  var factoryData, user;

  beforeEach(function(done) {
    DatabaseCleaner.clean(['users', 'stand_bookmarks'], function() {
      async.series([
        Factory.create('stand')
      ], function(err, data) {
        factoryData = data;
        done();
      });
    });
  });

  describe('signed in user', function() {
    beforeEach(function(done) {
      withSignIn(function(err, data) {
        user = data;
        done();
      });
    });

    it('should return 200 on success', function(done) {
      agent
      .post('/stands/' + factoryData[0].id + '/bookmarks.json')
      .send({_csrf: csrfToken})
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        expect(Object.keys(res.body).length).to.equal(0);
        done();
      });
    });

    it('should return error message if stand does not exist', function(done) {
      agent
      .post('/stands/' + 123 + '/bookmarks.json')
      .send({_csrf: csrfToken})
      .end(function(err, res) {
        expect(res.statusCode).to.equal(500);
        expect(res.body.error.stand[0].message).to.equal('Specified stand does not exist');
        done();
      });
    });

    it('should return error message if submitting a duplicate', function(done) {
      async.series([
        Factory.create('standBookmark', {stand: factoryData[0].id, user: user.id})
      ], function() {
        agent
        .post('/stands/' + factoryData[0].id + '/bookmarks.json')
        .send({_csrf: csrfToken})
        .end(function(err, res) {
          expect(res.statusCode).to.equal(500);
          expect(res.body.error.stand[0].message).to.equal('Stand already bookmarked');
          done();
        });
      });
    });
  });

  it('should return 403 forbidden', function(done) {
    agent
    .post('/stands/' + 123 + '/bookmarks.json')
    .send({_csrf: csrfToken})
    .end(function(err, res) {
      expect(res.statusCode).to.eql(403);
      expect(Object.keys(res.body).length).to.equal(0);
      done();
    });
  });
});
