/*global User: true, UserProfile: true */
'use strict';

/**
 * AdminUsersController.js
 *
 */

module.exports = {

  perPage: 20,

  index: function(req, res) {
    var items = [],
        options = {
          page: req.param('page') || 1,
          limit: this.perPage
        };

    var findUsers = function() {
      User.find()
      .populate('profile')
      .paginate({page: options.page, limit: options.limit})
      .exec(function(err, users) {
        if (err) {
          sails.log.error(err);
          return res.status(500).json({error: 'Database error'});
        }

        for (var item of users) {
          items.push(item.toJSON({cms: true}));
        }
        return res.json({users: items});
      });
    };

    findUsers();
  }
};
