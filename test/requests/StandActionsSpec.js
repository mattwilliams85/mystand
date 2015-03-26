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


describe('POST /stands/:standId/actions.json', function() {
  var stand,
      user,
      standActionData = {
        image_original_url: 'http://lorempixel.com/output/nature-q-c-640-480-2.jpg',
        youtube: 'JtJgbd1Jfuk',
        description: 'text'
      };

  beforeEach(function(done) {
    standActionData._csrf = csrfToken;

    DatabaseCleaner.clean(['stands', 'stand_actions', 'users'], function() {
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
      withSignIn(function(err, data) {
        user = data;
        done();
      });
    });

    it('should return created stand action object on success', function(done) {
      agent
        .post('/stands/' + stand.id + '/actions.json')
        .send(standActionData)
        .end(function(err, res) {
          expect(res.statusCode).to.eql(200);
          var validation = standActionSchema.validate(res.body.stand);
          expect(validation.error).to.be.null;
          expect(res.body.standAction.description).to.equal(standActionData.description);
          done();
        });
    });

    describe('stand validation', function() {
      it('should return error message', function(done) {
        // Using stand that doesn't exist
        agent
          .post('/stands/12345/actions.json')
          .send(standActionData)
          .end(function(err, res) {
            expect(res.statusCode).to.equal(500);
            expect(res.body.error.stand[0].message).to.equal('Specified stand does not exist');
            done();
          });
      });
    });
  });

  describe('guest user', function() {
    it('should return 403 forbidden', function(done) {
      agent
        .post('/stands/1/actions.json')
        .end(function(err, res) {
          expect(res.statusCode).to.eql(403);
          expect(Object.keys(res.body).length).to.equal(0);
          done();
        });
    });
  });
});
