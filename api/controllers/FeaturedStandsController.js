/*global FeaturedStand: true */
'use strict';

/**
 * FeaturedStandsController.js
 *
 */

module.exports = {

  /**
   * @api {get} /featured-stands Featured Stands
   * @apiName GetFeaturedStands
   * @apiGroup Stands
   *
   * @apiSuccess {Object[]} featuredStands List of featured stands.
   * @apiSuccess {Number} featuredStands.id Stand ID.
   * @apiSuccess {Number} featuredStands.position Position.
   * @apiSuccess {String} featuredStands.title Title.
   * @apiSuccess {String} featuredStands.description Description.
   * @apiSuccess {String} featuredStands.image_original_url Image URL.
   * @apiSuccess {String} featuredStands.youtube Youtube ID.
   * @apiSuccess {Number} featuredStands.goal Goal number.
   * @apiSuccess {String} featuredStands.category Category name.
   * @apiSuccess {Number} featuredStands.actions_count Actions count.
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *     "featuredStands": [
   *       {
   *         "id": 123,
   *         "position": 1,
   *         "title": "Save The Planet",
   *         "description": "Some description",
   *         "image_original_url": "http://www.mystand.herokuapp.com/img.jpg",
   *         "youtube": "43T5K8D3h",
   *         "goal": 100,
   *         "category": "Planet",
   *         "actions_count": 95
   *       }
   *     ]
   *   }
   */
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
