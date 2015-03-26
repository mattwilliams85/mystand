/*global User: true, Stand: true, StandAction: true */
'use strict';

/**
 * StandActionsController.js
 *
 */

module.exports = {

  perPage: 12,

  /**
   * @api {get} /stands/:standId/actions Stand Actions
   * @apiName GetStandActions
   * @apiGroup Stand Actions
   *
   * @apiParam {Number} page Page number
   * @apiParam {Number} standId Stand ID
   *
   * @apiSuccess {Object[]} standActions List of stand actions
   * @apiSuccess {Number} standActions.id Stand Action ID
   * @apiSuccess {Number} standActions.stand Stand ID
   * @apiSuccess {Number} standActions.user User ID
   * @apiSuccess {String} standActions.image_original_url Image url
   * @apiSuccess {String} standActions.youtube Youtube ID
   * @apiSuccess {String} standActions.description Description
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *     "standUpdates": [
   *       {
   *         "id": 123,
   *         "stand": 123,
   *         "user": 123,
   *         "image_original_url": "http://www.mystand.herokuapp.com/img.jpg",
   *         "youtube": "43T5K8D3h",
   *         "description": "Description here ..."
   *       }
   *     ]
   *   }
   */
  index: function(req, res) {
    var actions = [];
    StandAction.find()
    .where({stand: req.param('standId')})
    .sort('id DESC')
    .limit(this.perPage)
    .exec(function(err, items) {
      if (err) {
        console.log(err);
        return res.status(500).json({error: 'Database error'});
      }

      for (var item of items) {
        actions.push(item.toJSON());
      }
      return res.json({standActions: actions});
    });
  },


  /**
   * @api {post} /stands/:standId/actions Create a Stand Action
   * @apiName PostStandActions
   * @apiGroup Stand Actions
   *
   * @apiParam {Number} standId Stand ID
   * @apiParam {String} image_original_url Image url
   * @apiParam {String} youtube Youtube video ID
   * @apiParam {String} description Description
   *
   * @apiSuccess {Object} standAction Stand Action object
   * @apiSuccess {Number} standAction.id Stand Action ID
   * @apiSuccess {Number} standAction.stand Stand ID
   * @apiSuccess {Number} standAction.user User ID
   * @apiSuccess {String} standAction.image_original_url Image url
   * @apiSuccess {String} standAction.youtube Youtube ID
   * @apiSuccess {String} standAction.description Description
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *     "standAction": {
   *       "id": 123,
   *       "stand": 123,
   *       "user": 123,
   *       "image_original_url": "http://www.mystand.herokuapp.com/img.jpg",
   *       "youtube": "43T5K8D3h",
   *       "description": "Description here ..."
   *     }
   *   }
   */
  create: function(req, res) {
    var createStandAction = function(stand, currentUser) {
      StandAction.create({
        stand: stand.id,
        user: currentUser.id,
        image_original_url: req.body.image_original_url,
        youtube: req.body.youtube,
        description: req.body.description
      })
      .exec(function(err, standAction) {
        if (err) return res.status(500).json({error: err.Errors});

        return res.json({standAction: standAction.toJSON()});
      });
    };

    User.auth(req.session.user, function(err, currentUser) {
      if (err) return res.forbidden();

      // Make sure stand exists
      Stand.findOneById(req.param('standId')).exec(function(err, stand) {
        if (err || !stand) return res.status(500).json({error: {stand: [{message: 'Specified stand does not exist'}]}});

        return createStandAction(stand, currentUser);
      });
    });
  },
};
