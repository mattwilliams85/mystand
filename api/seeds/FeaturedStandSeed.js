/*global Stand: true */
'use strict';

/*
 * FeaturedStandSeed.js
 *
*/

module.exports = {
  data: function(callback) {
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
