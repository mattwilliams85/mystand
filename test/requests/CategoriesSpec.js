'use strict';

var joi = require('joi');

var categorySchema = joi.object({
  id: joi.number().integer().required(),
  title: joi.string().required()
});

var categoriesSchema = joi.object({
  categories: joi.array().items(categorySchema).required()
});

describe('GET /categories.json', function() {
  beforeEach(function(done) {
    DatabaseCleaner.clean(['categories'], function() {
      // Create categories
      async.series([
        Factory.create('category', {title: 'Apple', position: 3}),
        Factory.create('category', {title: 'Banana', position: 1}),
        Factory.create('category', {title: 'Beet', position: 2})
      ], function() {
        done();
      });
    });
  });

  it('should return a list of categories', function(done) {
    agent.get('/categories.json').end(function(err, res) {
      expect(res.statusCode).to.eql(200);
      var validation = categoriesSchema.validate(res.body);
      expect(validation.error).to.be.null;
      expect(res.body.categories.length).to.eql(3);
      expect(res.body.categories[0].title).to.eql('Banana');
      done();
    });
  });
});
