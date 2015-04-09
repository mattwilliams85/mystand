/*global StandBookmark: true */
'use strict';

/**
 * StandBookmark.js
 *
 */

module.exports = {

  tableName: 'stand_bookmarks',

  attributes: {
    stand: {
      model: 'Stand',
      required: true
    },
    user: {
      model: 'User',
      required: true
    }
  },

  validationMessages: {
    stand: {
      required: 'Stand is required'
    },
    user: {
      required: 'User is required'
    }
  },

  afterValidate: function(values, cb) {
    StandBookmark.validateUniqueStandAndUser(values, cb);
  },

  /**
   * Validate unique Stand And User
   *
   */
  validateUniqueStandAndUser: function(values, cb) {
    if (!values.stand || !values.user) return cb(null, values);

    StandBookmark.findOne({
      stand: values.stand,
      user: values.user
    }).exec(function(err, item){
      if (err) return cb(err);
      if (item) return cb({stand: [{message: 'Stand already bookmarked'}]});

      return cb(null, values);
    });
  }
};
