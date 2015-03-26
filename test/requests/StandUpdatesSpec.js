'use strict';

var joi = require('joi');

var standUpdateSchema = joi.object({
  id: joi.number().integer().required(),
  title: joi.string().required(),
  text: joi.string().required()
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
