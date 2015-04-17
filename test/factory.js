/*global User: true, UserProfile: true, UserNotification: true, Stand: true, StandBookmark: true, StandProfile: true, StandUpdate: true, StandAction: true, Category: true, FeaturedStand: true, Flag: true */
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
      last_name: 'Smith',
      is_admin: false
    };
    for (var key in opts) { attributes[key] = opts[key]; }

    User.create(attributes).exec(function(err, obj) {
      return callback(err, obj);
    });
  };

  Factory.userProfile = function(opts, callback) {
    opts = opts || {};
    var attributes = {
      user: 1,
      bio: 'bio ...',
      website: 'http://www.google.com'
    };
    for (var key in opts) { attributes[key] = opts[key]; }

    UserProfile.create(attributes).exec(function(err, obj) {
      return callback(err, obj);
    });
  };

  Factory.userNotifications = function(opts, callback) {
    opts = opts || {};
    var attributes = {
      user: 1,
      announcements: true
    };
    for (var key in opts) { attributes[key] = opts[key]; }

    UserNotification.create(attributes).exec(function(err, obj) {
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

  Factory.standUpdate = function(opts, callback) {
    opts = opts || {};
    var attributes = {
      stand: 1,
      title: 'Another update',
      text: 'Content here ...'
    };
    for (var key in opts) { attributes[key] = opts[key]; }

    StandUpdate.create(attributes).exec(function(err, obj) {
      return callback(err, obj);
    });
  };

  Factory.standAction = function(opts, callback) {
    opts = opts || {};
    var attributes = {
      stand: 1,
      user: 1,
      image_original_url: 'http://lorempixel.com/output/nature-q-c-640-480-2.jpg',
      youtube: 'JtJgbd1Jfuk',
      description: 'Content here ...'
    };
    for (var key in opts) { attributes[key] = opts[key]; }

    StandAction.create(attributes).exec(function(err, obj) {
      return callback(err, obj);
    });
  };

  Factory.standBookmark = function(opts, callback) {
    opts = opts || {};
    var attributes = {
      stand: 1,
      user: 1
    };
    for (var key in opts) { attributes[key] = opts[key]; }

    StandBookmark.create(attributes).exec(function(err, obj) {
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

  Factory.flag = function(opts, callback) {
    opts = opts || {};
    var attributes = {
      user: 1,
      content: {},
      content_id: 1,
      content_type: 'Stand'
    };
    for (var key in opts) { attributes[key] = opts[key]; }

    Flag.create(attributes).exec(function(err, obj) {
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
