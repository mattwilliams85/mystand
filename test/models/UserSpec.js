/*global User: true */
'use strict';

var bcrypt = require('bcrypt');

describe('User', function() {
  describe('.create', function() {
    beforeEach(function(done) {
      DatabaseCleaner.clean(['users'], function() {
        done();
      });
    });

    it('should encrypt password', function(done) {
      User.create({
        email: 'example@example.com',
        password: 'password',
        password_confirmation: 'password',
        first_name: 'Bob',
        last_name: 'Smith'
      })
      .exec(function(err, user) {
        expect(err).to.be.null;
        expect(user.password.length).to.be.at.least(50);

        bcrypt.compare('password', user.password, function(err, match) {
          expect(err).to.be.undefined;
          expect(match).to.be.true;

          done();
        });
      });
    });

    it('should validate password confirmation', function(done) {
      User.create({
        email: 'example@example.com',
        password: 'password',
        password_confirmation: 'wrongone',
        first_name: 'Bob',
        last_name: 'Smith'
      })
      .exec(function(err, user) {
        expect(err.invalidAttributes.password[0].message).to.equal('"password" validation rule failed for input: \'password\'');

        done();
      });
    });

    describe('validates email uniqueness', function() {
      var email;

      beforeEach(function(done) {
        email = 'email@example.com';

        async.series([
          Factory.create('user', {email: email})
        ], function(err, data) {
          done();
        });
      });

      it('should return error message', function(done) {
        User.create({
          email: email,
          password: 'password',
          password_confirmation: 'password',
          first_name: 'Bob',
          last_name: 'Smith'
        })
        .exec(function(err, user) {
          expect(err.invalidAttributes.email[0].message).to.equal('A record with that `email` already exists (`email@example.com`).');

          done();
        });
      });
    });
  });
});
