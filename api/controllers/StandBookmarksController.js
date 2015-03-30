/*global StandBookmark: true, User: true, Stand: true */
'use strict';

/**
 * StandBookmarksController.js
 *
 */

module.exports = {

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
          if (err) return res.status(500).json({error: err.Errors});

          return res.status(200).end();
        });
      });
    });
  }

};
