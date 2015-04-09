/*global Flag: true */
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
  },

  afterValidate: function(values, cb) {
    Flag.validateUniqueContentIdAndType(values, cb);
  },

  /**
   * Validate unique Content Id And Content Type
   *
   */
  validateUniqueContentIdAndType: function(values, cb) {
    if (!values.content_id || !values.content_type) return cb(null, values);

    Flag.findOne({
      content_id: values.content_id,
      content_type: values.content_type
    }).exec(function(err, item){
      if (err) return cb(err);
      if (item) return cb({content_id: [{message: 'Content already flagged'}]});

      return cb(null, values);
    });
  }
};
