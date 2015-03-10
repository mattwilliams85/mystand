/*
 * StandUpdate.js
 *
*/

module.exports = {

  tableName: 'stand_updates',

  attributes: {
    stand_id: {
      type: 'integer',
      required: true
    },
    text: {
      type: 'text'
    }
  }
};
