/*global Stand: true */
'use strict';

/*
 * StandUpdate.js
 *
*/

var seeder = require(__dirname + '/../seeds/StandUpdateSeed');

module.exports = {

  tableName: 'stand_updates',

  attributes: {
    stand: {
      model: 'Stand',
      required: true
    },
    title: {
      type: 'string',
      required: true
    },
    text: {
      type: 'text',
      required: true
    },

    toJSON: function toJSON() {
      var obj = this.toObject();
      return {
        id: obj.id,
        title: obj.title,
        text: obj.text,
        createdAt: obj.createdAt.valueOf()
      };
    },

    // Increase or decrease the updates_count on a stand
    changeUpdatesCount: function(num, callback) {
      Stand.findOneById(this.stand).exec(function(err, stand) {
        if (err) {
          console.log(err);
          return callback(err);
        }

        var count = stand.updates_count || 0;
        count += num;
        if (count < 0) count = 0;

        Stand.update({id: stand.id}, {updates_count: count}, function(err) {
          if (err) {
            console.log(err);
            return callback(err);
          }

          return callback();
        });
      });
    }
  },

  validationMessages: {
    stand: {
      required: 'Stand is required'
    },
    title: {
      required: 'Title is required'
    },
    text: {
      required: 'Text is required'
    }
  },

  /**
   * Lifecycle Callbacks
   *
   */
  afterCreate: function(standUpdate, callback) {
    standUpdate.changeUpdatesCount = this.attributes.changeUpdatesCount;
    standUpdate.changeUpdatesCount(1, function() {
      return callback();
    });
  },
  afterDestroy: function(records, callback) {
    records[0].changeUpdatesCount = this.attributes.changeUpdatesCount;
    records[0].changeUpdatesCount(-1, function() {
      return callback();
    });
  },

  seedData: seeder.data
};
