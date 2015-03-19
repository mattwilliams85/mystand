'use strict';

/*
 * Stand.js
 *
*/

var presenter = require(__dirname + '/../presenters/StandPresenter');
var seeder = require(__dirname + '/../seeds/StandSeed');

module.exports = {

  tableName: 'stands',

  attributes: {
    user_id: {
      type: 'integer',
      required: true
    },
    category: {
      model: 'Category',
      required: true
    },
    title: {
      type: 'string',
      required: true
    },
    image_original_url: {
      type: 'string',
      required: true
    },
    youtube: {
      type: 'string'
    },
    description: {
      type: 'string',
      required: true
    },
    goal_result: {
      type: 'string',
      required: true
    },
    goal: {
      type: 'integer',
      required: true
    },
    actions_count: {
      type: 'integer'
    },
    duration: {
      type: 'integer',
      required: true
    },
    is_public: {
      type: 'boolean'
    },

    toJSON: presenter
  },

  seedData: seeder.data
};
