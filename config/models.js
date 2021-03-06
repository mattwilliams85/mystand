'use strict';

/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 *
 * For more info on Sails models, see:
 * http://sailsjs.org/#/documentation/concepts/ORM
 */

module.exports.models = {

  /***************************************************************************
  *                                                                          *
  * Your app's default connection. i.e. the name of one of your app's        *
  * connections (see `config/connections.js`)                                *
  *                                                                          *
  ***************************************************************************/
  // connection: 'defaultPostgresqlServer',

  /***************************************************************************
  *                                                                          *
  * How and whether Sails will attempt to automatically rebuild the          *
  * tables/collections/etc. in your schema.                                  *
  *                                                                          *
  * See http://sailsjs.org/#/documentation/concepts/ORM/model-settings.html  *
  *                                                                          *
  ***************************************************************************/
  migrate: 'safe',


  /**
   * This method adds records to the database
   *
   * To use add a variable 'seedData' in your model and call the
   * method in the bootstrap.js file
   */
  seed: function(callback) {
    var self = this;
    var modelName = self.adapter.identity.charAt(0).toUpperCase() + self.adapter.identity.slice(1);
    if (!self.seedData) {
      sails.log.debug('No data avaliable to seed ' + modelName);
      callback();
      return;
    }
    self.count().exec(function(err, count) {
      if (!err && count === 0) {
        sails.log.debug('Seeding ' + modelName + '...');
        if (typeof(self.seedData) === 'function') {
          self.seedData(function(data) {
            self.seedData = data;
            self.seedArray(callback);
          });
        } else if (self.seedData instanceof Array) {
          self.seedArray(callback);
        } else {
          self.seedObject(callback);
        }
      } else {
        sails.log.debug(modelName + ' had records, so no seed needed');
        callback();
      }
    });
  },
  seedArray: function(callback) {
    var self = this;
    var modelName = self.adapter.identity.charAt(0).toUpperCase() + self.adapter.identity.slice(1);

    var asyncItems = [];
    var seedItem;
    for (var data of self.seedData) {
      seedItem = function(data) {
        return function(callback) {
          self.create(data).exec(function(err) {
            callback(err);
          });
        };
      };
      asyncItems.push(seedItem(data));
    }

    async.series(asyncItems, function(err) {
      if (err) {
        sails.log.debug(err);
        callback();
      } else {
        sails.log.debug(modelName + ' seed planted');
        callback();
      }
    });
  },
  seedObject: function(callback) {
    var self = this;
    var modelName = self.adapter.identity.charAt(0).toUpperCase() + self.adapter.identity.slice(1);
    self.create(self.seedData).exec(function(err) {
      if (err) {
        sails.log.debug(err);
        callback();
      } else {
        sails.log.debug(modelName + ' seed planted');
        callback();
      }
    });
  },

  errorMessagesJson: function(err) {
    return err.Errors || err.toJSON().raw || {};
  }

};
