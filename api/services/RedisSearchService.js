'use strict';

/*
 * RedisSearchService.js
 *
*/

var reds = require('reds');
reds.createClient = require(__dirname + '/../../lib/RedisClient').client;

module.exports = {

  createStandsSearch: function() {
    return reds.createSearch('stands');
  }

};
