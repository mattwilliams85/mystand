'use strict';

/*
 * StandBookmark.js
 *
*/

module.exports = {

  tableName: 'stand_bookmarks',

  attributes: {
    stand_id: {
      type: 'integer',
      required: true
    },
    user_id: {
      type: 'integer',
      required: true
    }
  }
};
