/*global StandAction: true */
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
   * @apiGroup Stands
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
  }
};
