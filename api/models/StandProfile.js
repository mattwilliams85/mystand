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
      type: 'text',
      required: true
    },
    petition: {
      type: 'text',
      required: true
    }
  },

  validationMessages: {
    stand: {
      required: 'Stand id is required'
    },
    full_description: {
      required: 'Full description is required'
    },
    petition: {
      required: 'Petition is required'
    }
  }
};
