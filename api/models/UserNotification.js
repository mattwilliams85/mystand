'use strict';

/**
 * UserNotification.js
 *
 */

module.exports = {

  tableName: 'user_notifications',

  attributes: {
    user: {
      model: 'User',
      required: true
    },
    announcements: {
      type: 'boolean'
    },
    updates: {
      type: 'boolean'
    },
    comments: {
      type: 'boolean'
    },
    actions: {
      type: 'boolean'
    },
    social: {
      type: 'boolean'
    },

    toJSON: function toJSON() {
      var obj = this.toObject();
      return {
        announcements: obj.announcements || false,
        updates: obj.updates || false,
        comments: obj.comments || false,
        actions: obj.actions || false,
        social: obj.social || false
      };
    },
  }
};
