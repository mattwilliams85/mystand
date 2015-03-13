'use strict';

var joi = require('joi');

var featuredStandSchema = joi.object({
  id: joi.number().integer().required(),
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

describe('GET /featured-stands', function() {
  it('should return a list of featured stands', function(done) {
    agent.get('/featured-stands').end(function(err, res) {
      expect(res.statusCode).to.eql(200);
      var validation = featuredStandsSchema.validate(res.body);
      expect(validation.error).to.be.null;
      done();
    });
  });
});
