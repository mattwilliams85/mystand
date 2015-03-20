'use strict';

/*
 * StandFlag.js
 *
*/

module.exports = {

  tableName: 'stand_flags',

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
