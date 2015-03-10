/*
 * Sharing.js
 *
*/

module.exports = {

  tableName: 'sharings',

  attributes: {
    uuid: {
      type: 'string'
    },
    user_id: {
      type: 'integer',
      required: true
    },
    stand_id: {
      type: 'integer',
      required: true
    }
  }
};
