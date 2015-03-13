/*global User: true */
'use strict';

var q = require('q');
var chance = require('chance').Chance();

module.exports = function() {

  function Factory() {}

  Factory.create = function(objectName, opts) {
    opts = opts || {};
    var deferred = q.defer();

    Factory[objectName](opts, function(err, obj) {
      if (err) {
        console.log(objectName + ' factory failed: ', err, obj);
        throw err;
      }

      deferred.resolve(obj);
    });

    return deferred.promise;
  };

  Factory.user = function(opts, callback) {
    opts = opts || {};
    var attributes = {
      email: chance.word({length: 8}) + '@example.com',
      password: 'passw0rD'
    };
    for (var key in opts) { attributes[key] = opts[key]; }

    User.create(attributes).exec(function(err, obj) {
      return callback(err, obj);
    });
  };

  return Factory;
};
