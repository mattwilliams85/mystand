/*
 * FeaturedStand.js
 *
*/

module.exports = {

  tableName: 'featured_stands',

  attributes: {
    stand_id: {
      type: 'integer',
      required: true
    },
    position: {
      type: 'integer'
    }
  }
};
