'use strict';

var joi = require('joi');

var trendingStandSchema = joi.object({
  id: joi.number().integer().required(),
  title: joi.string().required(),
  description: joi.string().required(),
  image_original_url: joi.string().required(),
  youtube: joi.string(),
  goal: joi.number().integer().required(),
  actions_count: joi.number().integer().required()
});

var trendingStandsSchema = joi.object({
  trendingStands: joi.array().items(trendingStandSchema).required()
});

describe('GET /trending-stands', function() {
  it('should return a list of trending stands', function(done) {
    agent.get('/trending-stands').end(function(err, res) {
      expect(res.statusCode).to.eql(200);
      var validation = trendingStandsSchema.validate(res.body);
      expect(validation.error).to.be.null;
      done();
    });
  });
});
