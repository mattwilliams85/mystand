/*global StandBookmark: true, User: true, Stand: true */
'use strict';

/**
 * StandBookmarksController.js
 *
 */

module.exports = {

  perPage: 12,

  /**
   * @api {get} /users/:userId/bookmarks User's Bookmarks
   * @apiName GetUserBookmarks
   * @apiGroup Stand Bookmarks
   *
   * @apiParam {Number} page Page number
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

    var findBookmarks = function() {
      StandBookmark.find()
      .where(options.where)
      .sort(options.sort)
      .paginate({page: options.page, limit: options.limit})
      .populate('stand')
      .exec(function(err, standBookmarks) {
        if (err) {
          console.log(err);
          return res.status(500).json({error: 'Database error'});
        }

        for (var bookmark of standBookmarks) {
          items.push(bookmark.stand.toJSON());
        }
        return res.json({stands: items});
      });
    };

    User.auth(req.session.user, function(err, currentUser) {
      if (err || parseInt(req.param('userId')) !== currentUser.id) return res.forbidden();

      options.where = { user: currentUser.id };

      return findBookmarks();
    });
  },


  /**
   * @api {post} /stands/:standId/bookmarks Create a Bookmark
   * @apiName PostStandBookmarks
   * @apiGroup Stand Bookmarks
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {}
   */
  create: function(req, res) {
    var createBookmark = function(currentUser, stand, callback) {
      StandBookmark.create({
        user: currentUser.id,
        stand: stand.id
      })
      .exec(function(err) {
        if (err) return callback(err);

        return callback();
      });
    };

    User.auth(req.session.user, function(err, currentUser) {
      if (err) return res.forbidden();

      // Make sure stand exists
      Stand.findOneById(req.param('standId')).exec(function(err, data) {
        if (err || !data) return res.status(500).json({error: {stand: [{message: 'Specified stand does not exist'}]}});

        createBookmark(currentUser, data, function(err) {
          if (err) return res.status(500).json({error: sails.config.models.errorMessagesJson(err)});

          return res.status(200).end();
        });
      });
    });
  }

};
