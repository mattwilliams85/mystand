'use strict';

/**
 * Flag.js
 *
 */

module.exports = {

  tableName: 'flags',

  attributes: {
    user: {
      model: 'User',
      required: true
    },
    content: {
      type: 'json',
      required: true
    },
    content_id: {
      type: 'integer',
      required: true
    },
    content_type: {
      type: 'string',
      required: true
    }
  },

  validationMessages: {
    user: {
      required: 'User is required'
    },
    content: {
      required: 'Content is required'
    },
    content_id: {
      required: 'Content ID is required'
    },
    content_type: {
      required: 'Content type is required'
    }
  }
};
