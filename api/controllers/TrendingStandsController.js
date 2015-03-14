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
      for (var stand of stands) {
        items.push(stand.toJSON());
      }
      return res.json({trendingStands: items});
    });
  }
};
