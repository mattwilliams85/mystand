'use strict';

/**
 * FeaturedStandsController.js
 *
 */

module.exports = {
  index: function (req, res) {
    var items = [];
    FeaturedStand.find().populate('stand').limit(5).sort('position').exec(function(err, featuredStands) {
      for (var i in featuredStands) {
        items.push(featuredStands[i].toJSON());
      }
      return res.json({featuredStands: items});
    });
  }
};
