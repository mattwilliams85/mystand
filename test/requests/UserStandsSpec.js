/*global Stand: true */
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


describe('GET /users/:userId/stands.json', function() {
  var stands,
      user,
      otherUser,
      userData = {
        email: 'bob@example.com',
        password: 'passw0RD',
        password_confirmation: 'passw0RD'
      };

  describe('when user is signed in', function() {
    beforeEach(function(done) {
      DatabaseCleaner.clean(['stands', 'users'], function() {
        withSignIn(userData, function(err, data) {
          user = data;

          // Create Other user
          async.series([
            Factory.create('user')
          ], function(err, data) {
            otherUser = data[0];

            // Create stands
            async.series([
              Factory.create('stand', {user: user.id, is_public: true}),
              Factory.create('stand', {user: user.id, is_public: false})
            ], function(err, data) {
              stands = data;
              done();
            });

          });
        });
      });
    });

    it('should return valid stands data format', function(done) {
      agent.get('/users/' + user.id + '/stands.json')
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        var validation = standsSchema.validate(res.body);
        expect(validation.error).to.be.null;
        done();
      });
    });

    it('should return active stands by default', function(done) {
      agent.get('/users/' + user.id + '/stands.json')
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        expect(res.body.stands.length).to.eql(1);
        expect(res.body.stands[0].id).to.eql(stands[0].id);
        done();
      });
    });

    it('should return inactive stands', function(done) {
      agent.get('/users/' + user.id + '/stands.json')
      .query('filter=inactive')
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        expect(res.body.stands.length).to.eql(1);
        expect(res.body.stands[0].id).to.eql(stands[1].id);
        done();
      });
    });

    it('should return 403 forbidden if trying to access other user\'s stands', function(done) {
      agent.get('/users/' + otherUser.id + '/stands.json')
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
      agent.get('/users/' + user.id + '/stands.json')
      .end(function(err, res) {
        expect(res.statusCode).to.eql(403);
        expect(Object.keys(res.body).length).to.equal(0);
        done();
      });
    });
  });
});


describe('GET /users/:userId/stands/activity.json', function() {
  var stands,
      user,
      otherUser,
      userData = {
        email: 'bob@example.com',
        password: 'passw0RD',
        password_confirmation: 'passw0RD'
      };

  describe('when user is signed in', function() {
    beforeEach(function(done) {
      DatabaseCleaner.clean(['stands', 'stand_actions', 'users'], function() {
        withSignIn(userData, function(err, data) {
          user = data;
          // Create Other user
          async.series([
            Factory.create('user')
          ], function(err, data) {
            otherUser = data[0];
            // Create stands
            async.series([
              Factory.create('stand', {user: user.id, is_public: true}),  // Open public stand
              Factory.create('stand', {user: user.id, is_public: false}), // Open private stand
              Factory.create('stand', {user: user.id, is_public: true})   // Closed public stand
            ], function(err, data) {
              stands = data;

              // Close a stand
              Stand.update({id: stands[2].id}, {closed_at: daysFromDate(new Date(), -1)}).exec(function(err) {
                if (err) throw err;

                // Create stand actions
                async.series([
                  Factory.create('standAction', {user: user.id, stand: stands[0].id}),
                  Factory.create('standAction', {user: user.id, stand: stands[0].id}),
                  Factory.create('standAction', {user: user.id, stand: stands[1].id}),
                  Factory.create('standAction', {user: user.id, stand: stands[2].id}),
                  Factory.create('standAction', {user: otherUser.id, stand: stands[0].id})
                ], function() {
                  done();
                });
              });
            });
          });
        });
      });
    });

    it('should return valid stands data format', function(done) {
      agent.get('/users/' + user.id + '/stands/activity.json')
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        var validation = standsSchema.validate(res.body);
        expect(validation.error).to.be.null;
        done();
      });
    });

    it('should return Open stands user acted on', function(done) {
      agent.get('/users/' + user.id + '/stands/activity.json')
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        expect(res.body.stands.length).to.eql(1);
        expect(res.body.stands[0].id).to.eql(stands[0].id);
        done();
      });
    });

    it('should return Closed stands user acted on', function(done) {
      agent.get('/users/' + user.id + '/stands/activity.json')
      .query('filter=closed')
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        expect(res.body.stands.length).to.eql(1);
        expect(res.body.stands[0].id).to.eql(stands[2].id);
        done();
      });
    });

    it('should return 403 forbidden if trying to access other user\'s stands', function(done) {
      agent.get('/users/' + otherUser.id + '/stands/activity.json')
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
      agent.get('/users/' + user.id + '/stands/activity.json')
      .end(function(err, res) {
        expect(res.statusCode).to.eql(403);
        expect(Object.keys(res.body).length).to.equal(0);
        done();
      });
    });
  });
});
