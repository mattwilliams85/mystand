/*global Stand: true, User: true */
'use strict';

/*
 * StandActionSeed.js
 *
*/

module.exports = {
  data: function(callback) {
    var seedData = [];
    User.find().limit(1).exec(function(err, users) {
      for (var user of users) {
        Stand.find().limit(10).exec(function(err, stands) {
          for (var stand of stands) {
            seedData.push({
              stand: stand.id,
              user: user.id,
              image_original_url: 'http://lorempixel.com/output/nature-q-c-640-480-2.jpg',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            });
            seedData.push({
              stand: stand.id,
              user: user.id,
              youtube: 'kWTQZYMIEKE',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            });
            seedData.push({
              stand: stand.id,
              user: user.id,
              image_original_url: 'http://lorempixel.com/output/nature-q-c-640-480-3.jpg',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            });
            seedData.push({
              stand: stand.id,
              user: user.id,
              image_original_url: 'http://lorempixel.com/output/nature-q-c-640-480-4.jpg',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            });
          }
          return callback(seedData);
        });
      }
    });
  }
};
