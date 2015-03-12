/*global User: true */
'use strict';

var bcrypt = require('bcrypt');

describe('.create', function() {
  beforeEach(function(done) {
    DatabaseCleaner.clean(['users'], function() {
      done();
    });
  });

  it('should encrypt password', function(done) {
    User.create({
      email: 'example@example.com',
      password: 'password'
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
});
