/*global User: true, UserNotification: true */
'use strict';

/**
 * UserNotificationsController.js
 *
 */

module.exports = {

  /**
   * @api {get} /users/:userId/notifications Get User Notifications
   * @apiName GetUserNotifications
   * @apiGroup Users
   *
   * @apiParam {Number} userId User ID
   *
   * @apiSuccess {Object} userNotifications User Notifications object
   * @apiSuccess {Boolean} userNotifications.announcements Announcements
   * @apiSuccess {Boolean} userNotifications.updates Updates
   * @apiSuccess {Boolean} userNotifications.comments Comments
   * @apiSuccess {Boolean} userNotifications.actions Actions
   * @apiSuccess {Boolean} userNotifications.social Social
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *     "userNotifications": {
   *       "announcements": true,
   *       "updates": false,
   *       "comments": false,
   *       "actions": true,
   *       "social": false
   *     }
   *   }
   */
  show: function(req, res) {
    User.auth(req.session.user, function(err, currentUser) {
      if (err || parseInt(req.param('userId')) !== currentUser.id) return res.forbidden();

      UserNotification.findOne({user: currentUser.id}).exec(function(err, userNotifications) {
        if (err) return res.status(500).json({error: 'Database error'});

        var data = {};
        if (userNotifications) data = userNotifications.toJSON();
        return res.json({userNotifications: data});
      });
    });
  },


  /**
   * @api {put} /users/:userId/notifications Update User Notifications
   * @apiName PutUserNotifications
   * @apiGroup Users
   *
   * @apiParam {Boolean} announcements Announcements
   * @apiParam {Boolean} updates Updates
   * @apiParam {Boolean} comments Comments
   * @apiParam {Boolean} actions Actions
   * @apiParam {Boolean} social Social
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {}
   */
  update: function(req, res) {
    var updateUserNotifications = function(userId, callback) {
      var data = {
        announcements: req.body.announcements,
        updates: req.body.updates,
        comments: req.body.comments,
        actions: req.body.actions,
        social: req.body.social
      };
      // Remove empty keys
      for (var key in data) {
        if (typeof data[key] !== 'boolean') delete data[key];
      }

      UserNotification.findOne({user: userId}).exec(function(err, userNotification) {
        if (err) return callback(err);

        // Update if exists, otherwise create
        if (userNotification) {
          UserNotification.update({user: userId}, data).exec(callback);
        } else {
          data.user = userId;
          UserNotification.create(data).exec(callback);
        }
      });
    };

    User.auth(req.session.user, function(err, currentUser) {
      if (err || parseInt(req.param('userId')) !== currentUser.id) return res.forbidden();

      updateUserNotifications(currentUser.id, function(err) {
        if (err) return res.status(500).json({error: sails.config.models.errorMessagesJson(err)});

        return res.status(200).end();
      });
    });
  }
};
