'use strict';

/*
 * StandUpdate.js
 *
*/

module.exports = {

  tableName: 'stand_updates',

  attributes: {
    stand: {
      model: 'Stand',
      required: true
    },
    text: {
      type: 'text'
    }
  }
};
