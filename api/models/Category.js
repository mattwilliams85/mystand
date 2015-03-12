'use strict';

/*
 * Category.js
 *
*/

module.exports = {

  tableName: 'categories',

  attributes: {
    title: {
      type: 'string',
      required: true
    }
  },

  // Seed data (only runs if Categories count is 0)
  seedData: [
    {title: 'biosphere'},
    {title: 'climate'},
    {title: 'energy'},
    {title: 'food'},
    {title: 'population'},
    {title: 'consumerism'},
    {title: 'poverty'},
    {title: 'social justice'},
    {title: 'war and conflict'},
    {title: 'secure our future'}
  ]
};
