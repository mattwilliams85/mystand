'use strict';

var joi = require('joi');

var standActionSchema = joi.object({
  id: joi.number().integer().required(),
  stand: joi.number().integer().required(),
  user: joi.number().integer().required(),
  image_original_url: joi.string().optional(),
  youtube: joi.string().optional(),
  description: joi.string().optional()
});

var standActionsSchema = joi.object({
  standActions: joi.array().items(standActionSchema).required()
});

describe('GET /stands/:standId/actions.json', function() {
  var stands, standActions;

  beforeEach(function(done) {
    DatabaseCleaner.clean(['stands', 'stand_actions'], function() {
      // Create stands
      async.series([
        Factory.create('stand'),
        Factory.create('stand')
      ], function(err, data) {
        stands = data;
        // Create stand actions
        async.series([
          Factory.create('standAction', {stand: stands[0].id}),
          Factory.create('standAction', {stand: stands[0].id}),
          Factory.create('standAction', {stand: stands[1].id})
        ], function(err, data) {
          standActions = data;
          done();
        });
      });
    });
  });

  it('should return a list of stand actions', function(done) {
    agent.get('/stands/' + stands[0].id + '/actions.json').end(function(err, res) {
      expect(res.statusCode).to.eql(200);
      var validation = standActionsSchema.validate(res.body);
      expect(validation.error).to.be.null;

      expect(res.body.standActions.length).to.eql(2);
      expect(res.body.standActions[0].id).to.eql(standActions[1].id);
      expect(res.body.standActions[1].id).to.eql(standActions[0].id);
      done();
    });
  });
});
