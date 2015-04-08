'use strict';

var joi = require('joi');

var featuredStandSchema = joi.object({
  id: joi.number().integer().required(),
  stand_id: joi.number().integer().required(),
  position: joi.number().integer().required(),
  title: joi.string().required(),
  description: joi.string().required(),
  image_original_url: joi.string().required(),
  youtube: joi.string(),
  goal: joi.number().integer().required(),
  category: joi.string().required(),
  actions_count: joi.number().integer().required()
});

var featuredStandsSchema = joi.object({
  featuredStands: joi.array().items(featuredStandSchema).required()
});

describe('GET /featured-stands.json', function() {
  beforeEach(function(done) {
    DatabaseCleaner.clean(['stands', 'featured_stands', 'categories'], function() {
      // Create category
      Factory.create('category')(function(err, category) {
        // Create stands
        async.series([
          Factory.create('stand', {category: category.id}),
          Factory.create('stand', {category: category.id}),
          Factory.create('stand', {category: category.id})
        ], function(err, factoryData) {
          // Create featured stands
          async.series([
            Factory.create('featuredStand', {position: 2, stand: factoryData[0].id, category: category.id}),
            Factory.create('featuredStand', {position: 1, stand: factoryData[1].id, category: category.id})
          ], function() {
            done();
          });
        });
      });
    });
  });

  it('should return a list of featured stands', function(done) {
    agent.get('/featured-stands.json').end(function(err, res) {
      expect(res.statusCode).to.eql(200);
      var validation = featuredStandsSchema.validate(res.body);
      expect(validation.error).to.be.null;
      expect(res.body.featuredStands[0].position).to.eql(1);
      done();
    });
  });
});
