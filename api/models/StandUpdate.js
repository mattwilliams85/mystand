'use strict';

/*
 * StandUpdate.js
 *
*/

var seeder = require(__dirname + '/../seeds/StandUpdateSeed');

module.exports = {

  tableName: 'stand_updates',

  attributes: {
    stand: {
      model: 'Stand',
      required: true
    },
    title: {
      type: 'string',
      required: true
    },
    text: {
      type: 'text',
      required: true
    },

    toJSON: function toJSON() {
      var obj = this.toObject();
      return {
        id: obj.id,
        title: obj.title,
        text: obj.text,
        createdAt: obj.createdAt.valueOf()
      };
    }
  },

  validationMessages: {
    stand: {
      required: 'Stand is required'
    },
    title: {
      required: 'Title is required'
    },
    text: {
      required: 'Text is required'
    }
  },

  seedData: seeder.data
};
