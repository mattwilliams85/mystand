'use strict';

/*
 * StandProfile.js
 *
*/

module.exports = {

  tableName: 'stand_profiles',

  attributes: {
    stand_id: {
      type: 'integer',
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
