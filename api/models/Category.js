'use strict';

/*
 * Category.js
 *
*/

var seeder = require(__dirname + '/../seeds/CategorySeed');

module.exports = {

  tableName: 'categories',

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    position: {
      type: 'integer'
    },

    toJSON: function() {
      return {
        id: this.id,
        title: this.title
      };
    }
  },

  seedData: seeder.data
};
