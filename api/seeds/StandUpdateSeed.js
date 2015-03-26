/*global Stand: true, User: true */
'use strict';

/*
 * StandUpdateSeed.js
 *
*/

module.exports = {
  data: function(callback) {
    var seedData = [];
    Stand.find().limit(10).exec(function(err, stands) {
      for (var stand of stands) {
        for (var i = 0; i < 5; i++) {
          seedData.push({
            stand: stand.id,
            title: 'Another update',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          });
        }
      }
      return callback(seedData);
    });
  }
};
