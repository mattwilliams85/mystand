'use strict';

/*
 * StandProfile.js
 *
*/

module.exports = {

  tableName: 'stand_profiles',

  attributes: {
    stand: {
      model: 'Stand',
      required: true
    },
    full_description: {
      type: 'text'
    },
    petition: {
      type: 'text'
    }
  }
};
