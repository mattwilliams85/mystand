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

  types: {
    password: function(password) {
      return password === this.password_confirmation;
    }
  },

  attributes: {
    profile: {
      model: 'UserProfile'
    },
    first_name: {
      type: 'string',
      required: true
    },
    last_name: {
      type: 'string',
      required: true
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
      password: true,
      columnName: 'encrypted_password'
    },
    is_admin: {
      type: 'boolean'
    },
    facebook_id: {
      type: 'string',
      unique: true
    },
    google_id: {
      type: 'string',
      unique: true
    },

    toJSON: presenter
  },

  validationMessages: {
    first_name: {
      required: 'First Name is required'
    },
    last_name: {
      required: 'Last Name is required'
    },
    email: {
      required: 'Email is required',
      email: 'Provide valid email address',
      unique: 'Email address is already taken'
    },
    password: {
      minLength: 'Password minimum length is 8 characters',
      required: 'Password is required',
      password: 'Password confirmation doesn\'t match',
    },
    facebook_id: {
      unique: 'FacebookID is already taken'
    },
    google_id: {
      unique: 'GoogleID is already taken'
    }
  },

  seedData: seeder.data,

  beforeCreate: function(attrs, callback) {
    this.encryptPassword(attrs.password, function(err, hash) {
      if (err) return callback(err);

      attrs.password = hash;
      return callback();
    });
  },

  beforeUpdate: function(attrs, callback) {
    if (!attrs.password) return callback();

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
      if (!user) return callback('Forbidden');

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
