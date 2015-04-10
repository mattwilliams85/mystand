/*global UserNotification: true */
'use strict';

var joi = require('joi');

var userNotificationsSchema = joi.object({
  userNotifications: joi.object({
    announcements: joi.boolean().required(),
    updates: joi.boolean().required(),
    comments: joi.boolean().required(),
    actions: joi.boolean().required(),
    social: joi.boolean().required()
  })
});


describe('GET /users/:userId/notifications.json', function() {
  var user;

  describe('user notifications record exist', function() {
    beforeEach(function(done) {
      DatabaseCleaner.clean(['users', 'user_notifications'], function() {
        withSignIn(function(err, data) {
          user = data;
          // Create user notifications
          async.series([
            Factory.create('userNotifications', {user: user.id})
          ], function() {
            done();
          });
        });
      });
    });

    it('should return user notifications', function(done) {
      agent
        .get('/users/' + user.id + '/notifications.json')
        .end(function(err, res) {
          expect(res.statusCode).to.eql(200);
          var validation = userNotificationsSchema.validate(res.body);
          expect(validation.error).to.be.null;
          done();
        });
    });

    it('should return 403 forbidden if trying to get other user\'s notifications data', function(done) {
      agent
      .get('/users/123/notifications.json')
      .end(function(err, res) {
        expect(res.statusCode).to.eql(403);
        expect(Object.keys(res.body).length).to.equal(0);
        done();
      });
    });
  });

  describe('user notifications record does NOT exist', function() {
    beforeEach(function(done) {
      DatabaseCleaner.clean(['users', 'user_notifications'], function() {
        withSignIn(function(err, data) {
          user = data;
          done();
        });
      });
    });

    it('should return user notifications', function(done) {
      agent
      .get('/users/' + user.id + '/notifications.json')
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        expect(res.body).to.eql({'userNotifications': {}});
        done();
      });
    });
  });
});


describe('PUT /users/:userId/notifications.json', function() {
  var user, updateNotificationsData;

  describe('user notifications record exist', function() {
    beforeEach(function(done) {
      updateNotificationsData = {
        _csrf: csrfToken,
        announcements: true,
        updates: true,
        comments: false
      };

      DatabaseCleaner.clean(['users', 'user_notifications'], function() {
        withSignIn(function(err, data) {
          user = data;
          // Create user notifications
          async.series([
            Factory.create('userNotifications', {user: user.id})
          ], function() {
            done();
          });
        });
      });
    });

    it('should return 200 on success', function(done) {
      agent
      .put('/users/' + user.id + '/notifications.json')
      .send(updateNotificationsData)
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        expect(Object.keys(res.body).length).to.equal(0);

        UserNotification.findOne({user: user.id}).exec(function(err, userNotification) {
          expect(userNotification.announcements).to.eql(updateNotificationsData.announcements);
          expect(userNotification.updates).to.eql(updateNotificationsData.updates);
          expect(userNotification.comments).to.eql(updateNotificationsData.comments);
          expect(userNotification.actions).to.eql(null);
          expect(userNotification.social).to.eql(null);

          done();
        });
      });
    });

    it('should return 403 forbidden if updating other user', function(done) {
      agent
      .put('/users/123/notifications.json')
      .send(updateNotificationsData)
      .end(function(err, res) {
        expect(res.statusCode).to.eql(403);
        expect(Object.keys(res.body).length).to.equal(0);
        done();
      });
    });
  });

  describe('user notifications record does NOT exist', function() {
    beforeEach(function(done) {
      updateNotificationsData = {
        _csrf: csrfToken,
        comments: true,
      };

      DatabaseCleaner.clean(['users', 'user_notifications'], function() {
        withSignIn(function(err, data) {
          user = data;
          done();
        });
      });
    });

    it('should return 200 on success jhsdgfjhsghjvdf', function(done) {
      agent
      .put('/users/' + user.id + '/notifications.json')
      .send(updateNotificationsData)
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        expect(Object.keys(res.body).length).to.equal(0);

        UserNotification.findOne({user: user.id}).exec(function(err, userNotification) {
          expect(userNotification.updates).to.eql(null);
          expect(userNotification.comments).to.eql(updateNotificationsData.comments);

          done();
        });
      });
    });
  });
});
