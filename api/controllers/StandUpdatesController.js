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
    var updates = [],
        options = {
          where: {},
          sort: 'id DESC',
          page: req.param('page') || 1,
          limit: this.perPage
        };
    StandUpdate.find()
    .where({stand: req.param('standId')})
    .sort('id DESC')
    .limit(this.perPage)
    .paginate({page: options.page, limit: options.limit})
    .exec(function(err, items) {
      if (err) {
        console.log(err);
        return res.status(500).json({error: 'Database error'});
      }

      for (var item of items) {
        updates.push(item.toJSON());
      }
      return res.json({standUpdates: updates});
    });
  },

  create: function(req, res) {
    var createStandUpdate = function(stand, currentUser) {
      StandUpdate.create({
        stand: stand.id,
        title: req.body.title,
        text: req.body.text
      })
      .exec(function(err, standUpdate) {
        if (err) return res.status(500).json({error: err.Errors});

        return res.json({standUpdate: standUpdate.toJSON()});
      });
    };

    User.auth(req.session.user, function(err, currentUser) {
      if (err) return res.forbidden();

      // Make sure stand exists
      Stand.findOneById(req.param('standId')).exec(function(err, stand) {
        if (err || !stand) return res.status(500).json({error: {stand: [{message: 'Specified stand does not exist'}]}});

        return createStandUpdate(stand, currentUser);
      });
    });
  },
};
