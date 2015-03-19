'use strict';

/*
 * Stand.js
 *
*/

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

    toJSON: function() {
      var obj = this.toObject();
      return {
        id: obj.id,
        title: obj.title,
        description: obj.description,
        image_original_url: obj.image_original_url,
        youtube: obj.youtube,
        goal: obj.goal,
        category: obj.category.title,
        actions_count: obj.actions_count || 0
      };
    }
  }
};
