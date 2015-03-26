/*global Stand: true */
'use strict';

/*
 * StandProfile.js
 *
*/

var seeder = require(__dirname + '/../seeds/StandProfileSeed');

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
    }
  },

  validationMessages: {
    stand: {
      required: 'Stand id is required'
    },
    full_description: {
      required: 'Full description is required'
    }
  },

  /**
   * Lifecycle Callbacks
   *
   */
  afterCreate: function(standProfile, callback) {
    // Update stand with profile ID
    Stand.update({id: standProfile.stand}, {profile: standProfile.id}).exec(function() {
      return callback();
    });
  },

  seedData: seeder.data
};
