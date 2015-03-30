'use strict';

describe('POST /stands/:standId/bookmarks.json', function() {
  var factoryData, user;

  beforeEach(function(done) {
    DatabaseCleaner.clean(['users'], function() {
      async.series([
        Factory.create('stand')
      ], function(err, data) {
        factoryData = data;
        done();
      });
    });
  });

  describe('signed in user', function() {
    beforeEach(function(done) {
      withSignIn(function(err, data) {
        user = data;
        done();
      });
    });

    it('should return 200 on success', function(done) {
      agent
      .post('/stands/' + factoryData[0].id + '/bookmarks.json')
      .send({_csrf: csrfToken})
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        expect(Object.keys(res.body).length).to.equal(0);
        done();
      });
    });

    it('should return error message if stand does not exist', function(done) {
      agent
      .post('/stands/' + 123 + '/bookmarks.json')
      .send({_csrf: csrfToken})
      .end(function(err, res) {
        expect(res.statusCode).to.equal(500);
        expect(res.body.error.stand[0].message).to.equal('Specified stand does not exist');
        done();
      });
    });
  });

  it('should return 403 forbidden', function(done) {
    agent
    .post('/stands/' + 123 + '/bookmarks.json')
    .send({_csrf: csrfToken})
    .end(function(err, res) {
      expect(res.statusCode).to.eql(403);
      expect(Object.keys(res.body).length).to.equal(0);
      done();
    });
  });
});
