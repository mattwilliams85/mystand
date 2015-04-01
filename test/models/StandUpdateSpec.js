/*global Stand: true */
'use strict';

describe('StandUpdate', function() {
  var stand;

  describe('.create', function() {
    beforeEach(function(done) {
      DatabaseCleaner.clean(['stands'], function() {
        async.series([
          Factory.create('stand'),
        ], function(err, data) {
          stand = data[0];
          done();
        });
      });
    });

    it('should increment updates count', function(done) {
      Stand.findOneById(stand.id).exec(function(err, stand) {
        expect(stand.updates_count).to.eql(0);

        Factory.create('standUpdate', {stand: stand.id})(function(err) {
          expect(err).to.be.null;

          Stand.findOneById(stand.id).exec(function(err, stand) {
            expect(stand.updates_count).to.eql(1);
            done();
          });
        });
      });
    });
  });

  describe('#destroy', function() {
    var stand, standUpdate;

    beforeEach(function(done) {
      DatabaseCleaner.clean(['stands'], function() {
        async.series([
          Factory.create('stand'),
        ], function(err, data) {
          stand = data[0];

          async.series([
            Factory.create('standUpdate', {stand: stand.id}),
          ], function(err, data) {
            standUpdate = data[0];
            done();
          });
        });
      });
    });

    it('should decrease updates count', function(done) {
      Stand.findOneById(stand.id).exec(function(err, stand) {
        expect(stand.updates_count).to.eql(1);

        standUpdate.destroy(function(err) {
          expect(err).to.be.null;

          Stand.findOneById(stand.id).exec(function(err, stand) {
            expect(stand.updates_count).to.eql(0);
            done();
          });
        });
      });
    });
  });
});
