'use strict';

/*
 * StandFlag.js
 *
*/

module.exports = {

  tableName: 'stand_flags',

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
