/*global Stand: true */
'use strict';

/*
 * StandAction.js
 *
*/

var seeder = require(__dirname + '/../seeds/StandActionSeed');

module.exports = {

  tableName: 'stand_actions',

  attributes: {
    stand: {
      model: 'Stand',
      required: true
    },
    user: {
      model: 'User',
      required: true
    },
    image_original_url: {
      type: 'string'
    },
    youtube: {
      type: 'string'
    },
    description: {
      type: 'string'
    },

    toJSON: function toJSON() {
      var obj = this.toObject();
      return {
        id: obj.id,
        stand: obj.stand,
        user: obj.user,
        image_original_url: obj.image_original_url,
        youtube: obj.youtube,
        description: obj.description
      };
    },

    // Increase or decrease the actions_count on a stand
    changeActionsCount: function(num, callback) {
      Stand.findOneById(this.stand).exec(function(err, stand) {
        if (err) {
          console.log(err);
          return callback(err);
        }

        var count = stand.actions_count || 0;
        count += num;
        if (count < 0) count = 0;

        Stand.update({id: stand.id}, {actions_count: count}, function(err) {
          if (err) {
            console.log(err);
            return callback(err);
          }

          // Notify subscribed clients about actions count update
          Stand.publishUpdate(stand.id, {actions_count: count});

          return callback();
        });
      });
    }
  },

  validationMessages: {
    stand: {
      required: 'Stand is required'
    },
    user: {
      required: 'User is required'
    }
  },

  /**
   * Lifecycle Callbacks
   *
   */
  afterCreate: function(standAction, callback) {
    standAction.changeActionsCount = this.attributes.changeActionsCount;
    standAction.changeActionsCount(1, function() {
      return callback();
    });
  },
  afterDestroy: function(records, callback) {
    records[0].changeActionsCount = this.attributes.changeActionsCount;
    records[0].changeActionsCount(-1, function() {
      return callback();
    });
  },

  seedData: seeder.data
};
