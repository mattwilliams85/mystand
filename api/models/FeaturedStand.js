/*global Stand: true */
'use strict';

/*
 * FeaturedStand.js
 *
*/

module.exports = {

  tableName: 'featured_stands',

  attributes: {
    stand: {
      model: 'Stand',
      required: true
    },
    category: {
      model: 'Category',
      required: true
    },
    position: {
      type: 'integer'
    },

    toJSON: function() {
      var obj = this.toObject();
      return {
        id: obj.id,
        position: obj.position,
        title: obj.stand.title,
        description: obj.stand.description,
        image_original_url: obj.stand.image_original_url,
        youtube: obj.stand.youtube,
        goal: obj.stand.goal,
        category: obj.category.title,
        actions_count: obj.stand.actions_count || 0
      };
    }
  },

  seedData: function(callback) {
    var seedData = [];
    Stand.find().limit(5).exec(function(err, stands) {
      for (var i in stands) {
        seedData.push({
          stand: stands[i].id,
          category: stands[i].category,
          position: parseInt(i) + 1
        });
      }
      return callback(seedData);
    });
  }
};
