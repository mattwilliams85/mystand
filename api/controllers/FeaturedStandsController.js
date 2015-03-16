/*global FeaturedStand: true */
'use strict';

/**
 * FeaturedStandsController.js
 *
 */

module.exports = {
  index: function(req, res) {
    var items = [];
    FeaturedStand.find()
    .populate('stand')
    .populate('category')
    .sort('position')
    .limit(5)
    .exec(function(err, featuredStands) {
      if (err) {
        console.log(err);
        return res.status(500).json({error: 'Database error'});
      }

      for (var stand of featuredStands) {
        items.push(stand.toJSON());
      }
      return res.json({featuredStands: items});
    });
  }
};
