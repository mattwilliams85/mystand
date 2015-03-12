/*global User: true */
'use strict';

var Q = require('q');

module.exports = function() {

  var allTables = [
    'users',
    'stands'
  ];

  function DatabaseCleaner() {}

  DatabaseCleaner.clean = function(tables, callback) {
    var truncateList = [];
    for (var i in tables) {
      truncateList.push(DatabaseCleaner.truncate(tables[i]));
    }

    Q.all(truncateList).then(function() {
      callback();
    });
  };

  DatabaseCleaner.cleanAll = function(callback) {
    DatabaseCleaner.clean(allTables, callback);
  };

  DatabaseCleaner.truncate = function(table) {
    var deferred = Q.defer();

    User.query('TRUNCATE ' + table, function(err) {
      if(err) throw err;

      deferred.resolve();
    });

    return deferred.promise;
  };

  return DatabaseCleaner;
};
