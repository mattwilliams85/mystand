'use strict';

/*
 * StandSeed.js
 *
*/

var chance = require('chance').Chance();

module.exports = {
  data: function(callback) {
    var youtubeVideos = ['kWTQZYMIEKE', 'kdrYtE2Us1g', 'JtJgbd1Jfuk', '3HAuTQGVgjc', 'CvEoncP-2Mc', 'JE_xMy7FSHA', 'y-JWXF-Pud4', 'kxopViU98Xo', 'ZmEs6YhCEO8'];
    var seedData = [];
    var image;
    for (var i = 0; i < 30; i++) {
      image = 'http://lorempixel.com/output/nature-q-c-640-480-' + (Math.floor(Math.random() * 10) + 1) + '.jpg';

      seedData.push({
        user: Math.floor(Math.random() * 3) + 1,
        category: Math.floor(Math.random() * 9) + 1,
        title: chance.word() + ' ' + chance.word(),
        image_original_url: Math.round(Math.random() * 1) ? image : null,
        youtube: youtubeVideos[Math.floor(Math.random() * youtubeVideos.length) + 1],
        description: 'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec id elit non mi porta gravida at eget metus!',
        goal_result: 'We\'ll do this and that ...',
        goal: 100,
        duration: 30,
        is_public: true
      });
    }
    return callback(seedData);
  }
};
