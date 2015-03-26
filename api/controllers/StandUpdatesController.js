/*global StandUpdate: true */
'use strict';

/**
 * StandUpdatesController.js
 *
 */

module.exports = {

  perPage: 5,

  /**
   * @api {get} /stands/:standId/updates Stand Updates
   * @apiName GetStandUpdates
   * @apiGroup Stands
   *
   * @apiParam {Number} page Page number
   * @apiParam {Number} standId Stand ID
   *
   * @apiSuccess {Object[]} standUpdates List of stand updates
   * @apiSuccess {Number} standUpdates.id Stand Update ID
   * @apiSuccess {String} standUpdates.title Title
   * @apiSuccess {String} standUpdates.text Content text
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *     "standUpdates": [
   *       {
   *         "id": 123,
   *         "title": "Update #1",
   *         "text": "Some content here"
   *       }
   *     ]
   *   }
   */
  index: function(req, res) {
    var items = [];
    StandUpdate.find()
    .where({stand: req.param('standId')})
    .sort('id DESC')
    .limit(this.perPage)
    .exec(function(err, updates) {
      if (err) {
        console.log(err);
        return res.status(500).json({error: 'Database error'});
      }

      for (var update of updates) {
        items.push(update.toJSON());
      }
      return res.json({standUpdates: items});
    });
  }
};
