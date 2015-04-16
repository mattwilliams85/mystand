'use strict';

var joi = require('joi');

var standUpdateSchema = joi.object({
  id: joi.number().integer().required(),
  title: joi.string().required(),
  text: joi.string().required(),
  createdAt: joi.number().integer().required()
});

var standUpdatesSchema = joi.object({
  standUpdates: joi.array().items(standUpdateSchema).required()
});

describe('GET /stands/:standId/updates.json', function() {
  var stands, standUpdates;

  beforeEach(function(done) {
    DatabaseCleaner.clean(['stands', 'stand_updates'], function() {
      // Create stands
      async.series([
        Factory.create('stand'),
        Factory.create('stand')
      ], function(err, data) {
        stands = data;
        // Create stand updates
        async.series([
          Factory.create('standUpdate', {stand: stands[0].id}),
          Factory.create('standUpdate', {stand: stands[0].id}),
          Factory.create('standUpdate', {stand: stands[1].id})
        ], function(err, data) {
          standUpdates = data;
          done();
        });
      });
    });
  });

  it('should return a list of stand updates', function(done) {
    agent.get('/stands/' + stands[0].id + '/updates.json').end(function(err, res) {
      expect(res.statusCode).to.eql(200);
      var validation = standUpdatesSchema.validate(res.body);
      expect(validation.error).to.be.null;

      expect(res.body.standUpdates.length).to.eql(2);
      expect(res.body.standUpdates[0].id).to.eql(standUpdates[1].id);
      expect(res.body.standUpdates[1].id).to.eql(standUpdates[0].id);
      done();
    });
  });
});

describe('POST /stands/:id/updates.json', function() {
  var stand;
  var standUpdateData = {
    title: "Title 1",
    text: "Baracka Obama"
  };

  beforeEach(function(done) {
    standUpdateData._csrf = csrfToken;

    DatabaseCleaner.clean(['stands', 'users'], function() {
      async.series([
        Factory.create('stand')
      ], function(err, data) {
        stand = data[0];
        done();
      });
    });
  });

  describe('signed in user', function() {
    beforeEach(function(done) {
      withSignIn(function() {
        done();
      });
    });

    it('should return created stand update object on success', function(done) {
      agent
        .post('/stands/' + stand.id + '/updates.json')
        .send(standUpdateData)
        .end(function(err, res) {
          expect(res.statusCode).to.eql(200);
          var validation = standUpdateSchema.validate(res.body.standUpdate);
          expect(validation.error).to.be.null;
          expect(res.body.standUpdate.title).to.equal(standUpdateData.title);
          expect(res.body.standUpdate.text).to.equal(standUpdateData.text);
          done();
        });
    });

    describe('stand attribute validation', function() {
      beforeEach(function() {
        standUpdateData.title = null;
      });

      it('should return error message', function(done) {
        agent
          .post('/stands/' + stand.id + '/updates.json')
          .send(standUpdateData)
          .end(function(err, res) {
            expect(res.statusCode).to.equal(500);
            expect(res.body.error.title[0].message).to.equal('Title is required');
            done();
          });
      });
    });
  });

  describe('guest user', function() {
    it('should return 403 forbidden', function(done) {
      agent
        .post('/stands/' + stand.id + '/updates.json')
        .end(function(err, res) {
          expect(res.statusCode).to.eql(403);
          expect(Object.keys(res.body).length).to.equal(0);
          done();
        });
    });
  });
});
