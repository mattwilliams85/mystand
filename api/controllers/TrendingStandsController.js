/*global Stand: true */
'use strict';

/**
 * TrendingStandsController.js
 *
 */

module.exports = {

  /**
   * @api {get} /trending-stands Trending Stands
   * @apiName GetTrendingStands
   * @apiGroup Stands
   *
   * @apiSuccess {Object[]} trendingStands List of trending stands.
   * @apiSuccess {Number} trendingStands.id Stand ID.
   * @apiSuccess {String} trendingStands.title Title.
   * @apiSuccess {String} trendingStands.description Description.
   * @apiSuccess {String} trendingStands.image_original_url Image URL.
   * @apiSuccess {String} trendingStands.youtube Youtube ID.
   * @apiSuccess {Number} trendingStands.goal Goal number.
   * @apiSuccess {String} trendingStands.category Category name.
   * @apiSuccess {Number} trendingStands.actions_count Actions count.
   * @apiSuccess {Number} trendingStands.updates_count Updates count
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *     "trendingStands": [
   *       {
   *         "id": 123,
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
    Stand.find()
    .populate('category')
    .sort('id DESC')
    .limit(3)
    .exec(function(err, stands) {
      if (err) {
        console.log(err);
        return res.status(500).json({error: 'Database error'});
      }

      for (var stand of stands) {
        items.push(stand.toJSON());
      }
      return res.json({trendingStands: items});
    });
  }
};
