'use strict';

/*
 * Sharing.js
 *
*/

module.exports = {

  tableName: 'sharings',

  attributes: {
    uuid: {
      type: 'string'
    },
    user: {
      model: 'User',
      required: true
    },
    stand: {
      model: 'Stand',
      required: true
    }
  }
};
