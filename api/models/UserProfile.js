'use strict';

/*
 * UserProfile.js
 *
*/

module.exports = {

  tableName: 'user_profiles',

  attributes: {
    user: {
      model: 'User',
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
