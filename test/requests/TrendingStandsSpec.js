'use strict';

var joi = require('joi');

var trendingStandSchema = joi.object({
  id: joi.number().integer().required(),
  title: joi.string().required(),
  description: joi.string().required(),
  image_original_url: joi.string().required(),
  youtube: joi.string(),
  goal: joi.number().integer().required(),
  category: joi.string().required(),
  actions_count: joi.number().integer().required(),
  updates_count: joi.number().integer().required(),
  closed_at: joi.number().integer().required()
});

var trendingStandsSchema = joi.object({
  trendingStands: joi.array().items(trendingStandSchema).required()
});

describe('GET /trending-stands.json', function() {
  beforeEach(function(done) {
    DatabaseCleaner.clean(['stands', 'categories'], function() {
      // Create category
      Factory.create('category')(function(err, category) {
        // Create stands
        async.series([
          Factory.create('stand', {category: category.id}),
          Factory.create('stand', {category: category.id}),
          Factory.create('stand', {category: category.id})
        ], function() {
          done();
        });
      });
    });
  });

  it('should return a list of trending stands', function(done) {
    agent.get('/trending-stands.json').end(function(err, res) {
      expect(res.statusCode).to.eql(200);
      var validation = trendingStandsSchema.validate(res.body);
      expect(validation.error).to.be.null;
      done();
    });
  });
});
