/*global Stand: true */
'use strict';

/**
 * TrendingStandsController.js
 *
 */

module.exports = {
  index: function(req, res) {
    var items = [];
    Stand.find().limit(3).populate('category').sort('id DESC').exec(function(err, stands) {
      for (var i in stands) {
        items.push(stands[i].toJSON());
      }
      return res.json({trendingStands: items});
    });
  }
};
