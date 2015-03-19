'use strict';

var joi = require('joi');

var userSchema = joi.object({
  user: joi.object({
    id: joi.number().integer().required(),
    email: joi.string().required(),
    first_name: joi.string().allow(null),
    last_name: joi.string().allow(null)
  })
});

describe('POST /users.json', function() {
  var factoryData,
      email,
      password;

  beforeEach(function(done) {
    email = 'example@example.com';
    password = 'password';

    DatabaseCleaner.clean(['users'], function() {
      done();
    });
  });

  it('should return created user object', function(done) {
    agent
      .post('/users.json')
      .send({_csrf: csrfToken, email: email, password: password, password_confirmation: password, first_name: 'Bob', last_name: 'Smith'})
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        var validation = userSchema.validate(res.body);
        expect(validation.error).to.be.null;
        expect(res.body.user.email).to.equal(email);
        done();
      });
  });

  describe('requires attributes', function() {
    it('should return error messages', function(done) {
      agent
        .post('/users.json')
        .send({_csrf: csrfToken})
        .end(function(err, res) {
          expect(res.statusCode).to.equal(500);
          expect(res.body.error.email[0].message).to.equal('`undefined` should be a email (instead of "null", which is a object)');
          expect(res.body.error.password[0].message).to.equal('`undefined` should be a string (instead of "null", which is a object)');
          expect(res.body.error.first_name[0].message).to.equal('`undefined` should be a string (instead of "null", which is a object)');
          expect(res.body.error.last_name[0].message).to.equal('`undefined` should be a string (instead of "null", which is a object)');
          done();
        });
    });
  });
});
