'use strict';

/*
 * FeaturedStand.js
 *
*/

var presenter = require(__dirname + '/../presenters/FeaturedStandPresenter');
var seeder = require(__dirname + '/../seeds/FeaturedStandSeed');

module.exports = {

  tableName: 'featured_stands',

  attributes: {
    stand: {
      model: 'Stand',
      required: true
    },
    category: {
      model: 'Category',
      required: true
    },
    position: {
      type: 'integer'
    },

    toJSON: presenter
  },

  seedData: seeder.data
};
