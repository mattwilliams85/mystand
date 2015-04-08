'use strict';

describe('POST /flags.json', function() {
  var factoryData;

  describe('flag a stand', function() {
    beforeEach(function(done) {
      DatabaseCleaner.clean(['stands', 'categories', 'users'], function() {
        // Create category
        async.series([
          Factory.create('category')
        ], function(err, data) {
          // Create a stand
          async.series([
            Factory.create('stand', {category: data[0].id})
          ], function(err, data) {
            factoryData = data;
            done();
          });
        });
      });
    });

    describe('signed in user', function() {
      beforeEach(function(done) {
        withSignIn(function() {
          done();
        });
      });

      it('should return 200 on success', function(done) {
        agent
        .post('/flags.json')
        .send({_csrf: csrfToken, contentId: factoryData[0].id, contentType: 'Stand'})
        .end(function(err, res) {
          expect(res.statusCode).to.eql(200);
          expect(Object.keys(res.body).length).to.equal(0);
          done();
        });
      });

      it('should return error message if content does not exist', function(done) {
        agent
        .post('/flags.json')
        .send({_csrf: csrfToken, contentId: 123, contentType: 'Stand'})
        .end(function(err, res) {
          expect(res.statusCode).to.equal(500);
          expect(res.body.error.content_id[0].message).to.equal('Specified content does not exist');
          done();
        });
      });
    });

    it('should return 403 forbidden', function(done) {
      agent
      .post('/flags.json')
      .send({_csrf: csrfToken})
      .end(function(err, res) {
        expect(res.statusCode).to.eql(403);
        expect(Object.keys(res.body).length).to.equal(0);
        done();
      });
    });
  });
});
