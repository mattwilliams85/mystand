/*global Stand: true */
'use strict';

/**
 * TrendingStandsController.js
 *
 */

module.exports = {
  index: function(req, res) {
    var items = [];
    Stand.find()
    .populate('category')
    .sort('id DESC')
    .limit(3)
    .exec(function(err, stands) {
      if (err) return res.status(500).json({error: 'Error requesting data'});

      for (var stand of stands) {
        items.push(stand.toJSON());
      }
      return res.json({trendingStands: items});
    });
  }
};
