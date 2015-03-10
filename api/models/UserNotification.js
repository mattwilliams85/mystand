/*
 * UserNotification.js
 *
*/

module.exports = {

  tableName: 'user_notifications',

  attributes: {
    user_id: {
      type: 'integer',
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
    }
  }
};
