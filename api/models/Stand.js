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
    category_id: {
      type: 'integer',
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
    }
  }
};
