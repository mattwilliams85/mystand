'use strict';

/*
 * StandAction.js
 *
*/

module.exports = {

  tableName: 'stand_actions',

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
