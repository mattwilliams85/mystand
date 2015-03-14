/*global FeaturedStand: true */
'use strict';

/**
 * FeaturedStandsController.js
 *
 */

module.exports = {
  index: function(req, res) {
    var items = [];
    FeaturedStand.find().populate('stand').populate('category').limit(5).sort('position').exec(function(err, featuredStands) {
      for (var stand of featuredStands) {
        items.push(stand.toJSON());
      }
      return res.json({featuredStands: items});
    });
  }
};
