/*global User: true */
'use strict';

module.exports = function() {

  var allTables = [
    'users',
    'stands'
  ];

  function DatabaseCleaner() {}

  DatabaseCleaner.clean = function(tables, callback) {
    var truncateList = [];
    for (var table of tables) {
      truncateList.push(DatabaseCleaner.truncate(table));
    }

    async.parallel(truncateList, function(err, data) {
      callback();
    });
  };

  DatabaseCleaner.cleanAll = function(callback) {
    DatabaseCleaner.clean(allTables, callback);
  };

  DatabaseCleaner.truncate = function(table) {
    var cb = function(callback) {
      User.query('TRUNCATE ' + table, function(err) {
        if(err) throw err;

        callback();
      });
    };

    return cb;
  };

  return DatabaseCleaner;
};
