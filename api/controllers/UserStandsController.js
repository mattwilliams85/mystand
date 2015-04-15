/*global Stand: true, User: true */
'use strict';

/**
 * UserStandsController.js
 *
 */

module.exports = {

  perPage: 12,

  /**
   * @api {get} /users/:userId/stands User Stands
   * @apiName GetUserStands
   * @apiGroup Users
   *
   * @apiParam {Number} page Page number
   * @apiParam {String} filter Filter type(incomplete/active/closed)
   *
   * @apiSuccess {Object[]} stands List of stands.
   * @apiSuccess {Number} stands.id Stand ID.
   * @apiSuccess {String} stands.title Title.
   * @apiSuccess {String} stands.description Description.
   * @apiSuccess {String} stands.image_original_url Image URL.
   * @apiSuccess {String} stands.youtube Youtube ID.
   * @apiSuccess {Number} stands.goal Goal number.
   * @apiSuccess {Number} stands.actions_count Actions count.
   * @apiSuccess {Number} stands.updates_count Updates count
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *     "stands": [
   *       {
   *         "id": 123,
   *         "title": "Save The Planet",
   *         "description": "Some description",
   *         "image_original_url": "http://www.mystand.herokuapp.com/img.jpg",
   *         "youtube": "43T5K8D3h",
   *         "goal": 100,
   *         "actions_count": 95,
   *         "updates_count": 5
   *       }
   *     ]
   *   }
   */
  index: function(req, res) {
    var items = [],
        options = {
          sort: 'id DESC',
          page: req.param('page') || 1,
          limit: this.perPage
        };

    var findStands = function() {
      Stand.find()
      .where(options.where)
      .sort(options.sort)
      .paginate({page: options.page, limit: options.limit})
      .exec(function(err, stands) {
        if (err) {
          return res.status(500).json({error: 'Database error'});
        }

        for (var stand of stands) {
          items.push(stand.toJSON());
        }
        return res.json({stands: items});
      });
    };

    User.auth(req.session.user, function(err, currentUser) {
      if (err || parseInt(req.param('userId')) !== currentUser.id) return res.forbidden();

      options.where = { user: currentUser.id };

      if (req.param('filter') === 'inactive') {
        options.where.is_public = null;
      } else if (req.param('filter') === 'closed') {
        console.log(new Date())
        options.where.closed_at = {'<': (new Date())};
      } else {
        options.where.is_public = true;
      }

      return findStands(currentUser);
    });
  }
};
