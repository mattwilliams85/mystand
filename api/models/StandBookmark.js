'use strict';

/*
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
  }
};
