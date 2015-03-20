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
    user: {
      model: 'User',
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

  validationMessages: {
    user: {
      required: 'User is required'
    },
    category: {
      required: 'Category is required'
    },
    title: {
      required: 'Title is required'
    },
    image_original_url: {
      required: 'Image is required'
    },
    description: {
      required: 'Description is required'
    },
    goal_result: {
      required: 'Goal result is required'
    },
    goal: {
      required: 'Goal is required'
    },
    duration: {
      required: 'Duration is required'
    }
  },

  seedData: seeder.data
};
