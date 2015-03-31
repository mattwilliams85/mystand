/*global Stand: true */
'use strict';

describe('StandAction', function() {
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

    it('should increment actions count', function(done) {
      Stand.findOneById(stand.id).exec(function(err, stand) {
        expect(stand.actions_count).to.be.null;

        Factory.create('standAction', {stand: stand.id})(function(err) {
          expect(err).to.be.null;

          Stand.findOneById(stand.id).exec(function(err, stand) {
            expect(stand.actions_count).to.eql(1);
            done();
          });
        });
      });
    });
  });

  describe('#destroy', function() {
    var stand, standAction;

    beforeEach(function(done) {
      DatabaseCleaner.clean(['stands'], function() {
        async.series([
          Factory.create('stand'),
        ], function(err, data) {
          stand = data[0];

          async.series([
            Factory.create('standAction', {stand: stand.id}),
          ], function(err, data) {
            standAction = data[0];
            done();
          });
        });
      });
    });

    it('should decrease actions count', function(done) {
      Stand.findOneById(stand.id).exec(function(err, stand) {
        expect(stand.actions_count).to.eql(1);

        standAction.destroy(function(err) {
          expect(err).to.be.null;

          Stand.findOneById(stand.id).exec(function(err, stand) {
            expect(stand.actions_count).to.eql(0);
            done();
          });
        });
      });
    });
  });
});
