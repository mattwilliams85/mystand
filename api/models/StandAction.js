'use strict';

/*
 * StandAction.js
 *
*/

var seeder = require(__dirname + '/../seeds/StandActionSeed');

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
    },
    image_original_url: {
      type: 'string'
    },
    youtube: {
      type: 'string'
    },
    description: {
      type: 'string'
    },

    toJSON: function toJSON() {
      var obj = this.toObject();
      return {
        id: obj.id,
        stand: obj.stand,
        user: obj.user,
        image_original_url: obj.image_original_url,
        youtube: obj.youtube,
        description: obj.description
      };
    }
  },

  validationMessages: {
    stand: {
      required: 'Stand is required'
    },
    user: {
      required: 'User is required'
    }
  },

  seedData: seeder.data
};
