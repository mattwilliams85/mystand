'use strict';

/*
 * User.js
 *
*/

var bcrypt = require('bcrypt');

var presenter = require(__dirname + '/../presenters/UserPresenter');
var seeder = require(__dirname + '/../seeds/UserSeed');

module.exports = {

  tableName: 'users',

  attributes: {
    first_name: {
      type: 'string'
    },
    last_name: {
      type: 'string'
    },
    image_original_url: {
      type: 'string'
    },
    email: {
      type: 'email',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      minLength: 8,
      required: true,
      columnName: 'encrypted_password'
    },
    is_admin: {
      type: 'boolean'
    },

    toJSON: presenter
  },

  seedData: seeder.data,

  beforeCreate: function(attrs, callback) {
    this.encryptPassword(attrs.password, function(err, hash) {
      if (err) return callback(err);

      attrs.password = hash;
      return callback();
    });
  },

  encryptPassword: function(password, callback) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) return callback(err);

        return callback(null, hash);
      });
    });
  },

  auth: function(userId, callback) {
    if (!userId) return callback('Forbidden');
    this.findOneById(userId).exec(function(err, user) {
      if (err) {
        console.log(err);
        return callback(err);
      }

      return callback(null, user);
    });
  },

  authAdmin: function(userId, callback) {
    this.auth(userId, function(err, user) {
      if (err) return callback(err);
      if (!user.is_admin) return callback('Forbidden');

      return callback(null, user);
    });
  }
};
