'use strict';

/*
 * StandComment.js
 *
*/

module.exports = {

  tableName: 'stand_comments',

  attributes: {
    user_id: {
      type: 'integer',
      required: true
    },
    stand_id: {
      type: 'integer',
      required: true
    },
    parent_id: {
      type: 'integer'
    },
    text: {
      type: 'text',
      required: true
    }
  }
};
