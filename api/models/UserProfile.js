'use strict';

/*
 * UserProfile.js
 *
*/

module.exports = {

  tableName: 'user_profiles',

  attributes: {
    user_id: {
      type: 'integer',
      required: true
    },
    bio: {
      type: 'string'
    },
    website: {
      type: 'string'
    },
    stands_count: {
      type: 'integer'
    },
    score: {
      type: 'integer'
    }
  }
};
