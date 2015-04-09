/*global Flag: true, User: true, Stand: true, StandAction: true, Comment: true */
'use strict';

/**
 * FlagsController.js
 *
 */

module.exports = {

  /**
   * @api {post} /flags Create a Flag
   * @apiName PostFlags
   * @apiGroup Flags
   *
   * @apiParam {String} contentType Content type
   * @apiParam {String} contentId Content ID
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {}
   */
  create: function(req, res) {
    var content;
    var findFlagContent = function(contentId, contentType, callback) {
      var classNames = {
            'Stand': Stand,
            'StandAction': StandAction
          };
      var className = classNames[contentType];

      if (className) {
        className.findOneById(contentId).exec(function(err, data) {
          if (err) return callback(err);

          return callback(null, data);
        });
      } else {
        return callback('Content not found');
      }
    };

    var createFlag = function(currentUser, callback) {
      Flag.create({
        user: currentUser.id,
        content: content.toJSON(),
        content_id: req.body.contentId,
        content_type: req.body.contentType
      })
      .exec(function(err) {
        if (err) return callback(err);

        return callback();
      });
    };

    User.auth(req.session.user, function(err, currentUser) {
      if (err) return res.forbidden();

      // Make sure content exist
      findFlagContent(req.body.contentId, req.body.contentType, function(err, data) {
        if (err || !data) return res.status(500).json({error: {content_id: [{message: 'Specified content does not exist'}]}});
        content = data;

        createFlag(currentUser, function(err) {
          if (err) return res.status(500).json({error: sails.config.models.errorMessagesJson(err)});

          return res.status(200).end();
        });
      });
    });
  }

};
