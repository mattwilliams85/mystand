/*global Category: true */
'use strict';

/**
 * CategoriesController.js
 *
 */

module.exports = {

  /**
   * @api {get} /categories Categories
   * @apiName GetCategories
   * @apiGroup Categories
   *
   * @apiSuccess {Object[]} categories List of categories
   * @apiSuccess {Number} categories.id Category ID
   * @apiSuccess {String} categories.title Title
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *     "categories": [
   *       {
   *         "id": 123,
   *         "title": "Planet"
   *       }
   *     ]
   *   }
   */
  index: function(req, res) {
    var items = [];
    Category.find()
    .sort('position')
    .exec(function(err, categories) {
      if (err) {
        console.log(err);
        return res.status(500).json({error: 'Database error'});
      }

      for (var category of categories) {
        items.push(category.toJSON());
      }
      return res.json({categories: items});
    });
  }
};
