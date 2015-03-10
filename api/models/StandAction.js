/*
 * StandAction.js
 *
*/

module.exports = {

  tableName: 'stand_actions',

  attributes: {
    stand_id: {
      type: 'integer',
      required: true
    },
    user_id: {
      type: 'integer',
      required: true
    }
  }
};
