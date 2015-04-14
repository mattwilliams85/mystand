/*global User: true */
'use strict';

/*
 * UserProfileSeed.js
 *
*/

module.exports = {
  data: function(callback) {
    var seedData = [];
    User.find().limit(10).exec(function(err, users) {
      for (var user of users) {
        seedData.push({
          user: user.id,
          bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          website: 'http://www.eyecuelab.com',
          score: Math.floor((Math.random() * 10000) + 1)
        });
      }
      return callback(seedData);
    });
  }
};
