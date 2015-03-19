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
    }
  },

  seedData: seeder.data
};
