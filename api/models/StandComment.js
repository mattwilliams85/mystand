'use strict';

/*
 * StandComment.js
 *
*/

module.exports = {

  tableName: 'stand_comments',

  attributes: {
    stand: {
      model: 'Stand',
      required: true
    },
    user: {
      model: 'User',
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
