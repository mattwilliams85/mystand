/*global User: true */
'use strict';

/*
 * UserProfile.js
 *
*/

var seeder = require(__dirname + '/../seeds/UserProfileSeed');

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
  },

  validationMessages: {
    user: {
      required: 'User id is required'
    }
  },

  /**
   * Lifecycle Callbacks
   *
   */
  afterCreate: function(userProfile, callback) {
    // Update user with profile ID
    User.update({id: userProfile.user}, {profile: userProfile.id}).exec(function() {
      return callback();
    });
  },

  seedData: seeder.data
};
