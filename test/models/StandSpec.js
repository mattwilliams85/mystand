/*global Stand: true */
'use strict';

describe('Stand', function() {
  var factoryData;

  describe('.update', function() {
    beforeEach(function(done) {
      redisClient.flushdb();
      DatabaseCleaner.clean(['stands'], function() {
        // Create stands
        async.series([
          Factory.create('stand', {title: 'cow'}),
          Factory.create('stand', {title: 'dog'})
        ], function(err, data) {
          factoryData = data;
          done();
        });
      });
    });

    it('should recreate search index', function(done) {
      Stand.update({id: factoryData[0].id}, {title: 'zebra'}).exec(function(err) {
        expect(err).to.be.null;
        // Making sure that stand is now searchable by the new title
        Stand.search('zebra', function(err, ids) {
          expect(ids).to.be.eql([factoryData[0].id.toString()]);
          // Making sure that old stand data is removed from index
          Stand.search('cow', function(err, ids) {
            expect(ids).to.be.eql([]);
            done();
          });
        });
      });
    });
  });

  describe('.create', function() {
    beforeEach(function(done) {
      DatabaseCleaner.clean(['stands'], function() {
        // Create stands
        async.series([
          Factory.create('stand', {title: 'apple banana', duration: 5}),
          Factory.create('stand', {title: 'apple beet', duration: 10}),
          Factory.create('stand', {title: 'kiwi potato', duration: 15})
        ], function(err, data) {
          factoryData = data;
          done();
        });
      });
    });

    it('should create search index', function(done) {
      Stand.search('beet', function(err, ids) {
        expect(ids).to.be.eql([factoryData[1].id.toString()]);
        Stand.search('apple', function(err, ids) {
          expect(ids).to.be.eql([factoryData[1].id.toString(), factoryData[0].id.toString()]);
          done();
        });
      });
    });

    it('should set closed_at timestamp based on provided duration', function(done) {
      var now = new Date();

      Stand.findOneById(factoryData[0].id).exec(function(err, stand) {
        expect(err).to.be.null;
        expect(formattedDate(stand.closed_at)).to.be.eql(formattedDate(daysFromDate(now, 5)));

        Stand.findOneById(factoryData[1].id).exec(function(err, stand) {
          expect(err).to.be.null;
          expect(formattedDate(stand.closed_at)).to.be.eql(formattedDate(daysFromDate(now, 10)));
          done();
        });
      });
    });
  });

  describe('#destroy', function() {
    beforeEach(function(done) {
      DatabaseCleaner.clean(['stands'], function() {
        // Create a stand
        async.series([
          Factory.create('stand', {title: 'rabbit'})
        ], function(err, data) {
          factoryData = data;
          // Delete a stand
          Stand.findOneById(factoryData[0].id).exec(function(err, stand) {
            expect(err).to.be.null;
            stand.destroy(function(err) {
              expect(err).to.be.null;
              done();
            });
          });
        });
      });
    });

    it('should remove search index', function(done) {
      Stand.search('rabbit', function(err, ids) {
        expect(ids).to.be.eql([]);
        done();
      });
    });
  });
});
