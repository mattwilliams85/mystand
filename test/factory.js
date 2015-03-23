/*global User: true, Stand: true, StandProfile: true, Category: true, FeaturedStand: true */
'use strict';

var chance = require('chance').Chance();

module.exports = function() {

  function Factory() {}

  Factory.create = function(objectName, opts) {
    var factoryCB = function(callback) {
      Factory[objectName](opts, function(err, obj) {
        if (err) {
          console.log(objectName + ' factory failed: ', err, obj);
          throw err;
        }

        return callback(null, obj);
      });
    };

    return factoryCB;
  };

  Factory.user = function(opts, callback) {
    opts = opts || {};
    var attributes = {
      email: chance.word({length: 8}) + '@example.com',
      password: 'passw0rD',
      password_confirmation: 'passw0rD',
      first_name: 'John',
      last_name: 'Smith'
    };
    for (var key in opts) { attributes[key] = opts[key]; }

    User.create(attributes).exec(function(err, obj) {
      return callback(err, obj);
    });
  };

  Factory.stand = function(opts, callback) {
    opts = opts || {};
    var attributes = {
      user: 1,
      category: 1,
      title: 'Amazing stand',
      image_original_url: 'http://lorempixel.com/output/nature-q-c-640-480-2.jpg',
      youtube: 'JtJgbd1Jfuk',
      description: 'Description ...',
      goal_result: 'Result text goes here ...',
      goal: 100,
      actions_count: 0,
      duration: 30,
      is_public: true
    };
    for (var key in opts) { attributes[key] = opts[key]; }

    Stand.create(attributes).exec(function(err, obj) {
      return callback(err, obj);
    });
  };

  Factory.standProfile = function(opts, callback) {
    opts = opts || {};
    var attributes = {
      stand: 1,
      full_description: 'Full Description ...'
    };
    for (var key in opts) { attributes[key] = opts[key]; }

    StandProfile.create(attributes).exec(function(err, obj) {
      return callback(err, obj);
    });
  };

  Factory.featuredStand = function(opts, callback) {
    opts = opts || {};
    var attributes = {
      stand: 1,
      category: 1,
      position: 0
    };
    for (var key in opts) { attributes[key] = opts[key]; }

    FeaturedStand.create(attributes).exec(function(err, obj) {
      return callback(err, obj);
    });
  };

  Factory.category = function(opts, callback) {
    opts = opts || {};
    var attributes = {
      title: chance.word({length: 8})
    };
    for (var key in opts) { attributes[key] = opts[key]; }

    Category.create(attributes).exec(function(err, obj) {
      return callback(err, obj);
    });
  };

  return Factory;
};
