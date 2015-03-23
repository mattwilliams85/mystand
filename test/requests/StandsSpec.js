/*global Stand: true */
'use strict';

var joi = require('joi');

var standSchema = joi.object({
  id: joi.number().integer().required(),
  title: joi.string().required(),
  description: joi.string().required(),
  image_original_url: joi.string().required(),
  youtube: joi.string(),
  goal: joi.number().integer().required(),
  category: joi.string().required(),
  actions_count: joi.number().integer().required()
});

var standsSchema = joi.object({
  stands: joi.array().items(standSchema).required()
});

describe('GET /stands.json', function() {
  var factoryData;
  beforeEach(function(done) {
    DatabaseCleaner.clean(['stands', 'categories'], function() {
      // Create category
      Factory.create('category')(function(err, category) {
        // Create stands with category
        async.series([
          Factory.create('stand', {category: category.id}),
          Factory.create('stand', {category: category.id})
        ], function(err, data) {
          factoryData = data;
          done();
        });
      });
    });
  });

  it('should return a list of stands', function(done) {
    agent.get('/stands.json').end(function(err, res) {
      expect(res.statusCode).to.eql(200);
      var validation = standsSchema.validate(res.body);
      expect(validation.error).to.be.null;
      done();
    });
  });
});

describe('GET /stands/:id.json', function() {
  var factoryData;
  beforeEach(function(done) {
    DatabaseCleaner.clean(['stands', 'categories'], function() {
      // Create category
      Factory.create('category')(function(err, category) {
        // Create stands with category
        async.series([
          Factory.create('stand', {category: category.id}),
          Factory.create('stand', {category: category.id})
        ], function(err, data) {
          factoryData = data;
          done();
        });
      });
    });
  });

  it('should return a stand', function(done) {
    agent.get('/stands/' + factoryData[0].id + '.json').end(function(err, res) {
      expect(res.statusCode).to.eql(200);
      var validation = standSchema.validate(res.body.stand);
      expect(validation.error).to.be.null;
      expect(res.body.stand.id).to.eql(factoryData[0].id);
      done();
    });
  });
});

describe('POST /stands.json', function() {
  var category,
      userData = {
        email: 'email@example.com',
        password: 'password',
        password_confirmation: 'password'
      },
      standData = {
        title: 'Amazing stand',
        image_original_url: 'http://lorempixel.com/output/nature-q-c-640-480-2.jpg',
        youtube: 'JtJgbd1Jfuk',
        description: 'text',
        goal_result: 'text',
        goal: 100,
        actions_count: 0,
        duration: 30,
        full_description: 'text',
        petition: 'text'
      };

  beforeEach(function(done) {
    standData._csrf = csrfToken;

    DatabaseCleaner.clean(['stands', 'categories', 'users'], function() {
      async.series([
        Factory.create('user', userData),
        Factory.create('category')
      ], function(err, data) {
        category = data[1];
        standData.category = category.id;
        done();
      });
    });
  });

  describe('signed in user', function() {
    beforeEach(function(done) {
      // Real sign in process, TODO: use mocked user
      agent
        .post('/login.json')
        .send({_csrf: csrfToken, email: userData.email, password: userData.password})
        .end(function(err, res) {
          expect(res.statusCode).to.eql(200);
          done();
        });
    });

    it('should return created stand object on success', function(done) {
      agent
        .post('/stands.json')
        .send(standData)
        .end(function(err, res) {
          expect(res.statusCode).to.eql(200);
          var validation = standSchema.validate(res.body.stand);
          expect(validation.error).to.be.null;
          expect(res.body.stand.title).to.equal(standData.title);
          done();
        });
    });

    describe('category validation', function() {
      beforeEach(function() {
        // Using category that doesn't exist
        standData.category = 12345;
      });

      it('should return error message', function(done) {
        agent
          .post('/stands.json')
          .send(standData)
          .end(function(err, res) {
            expect(res.statusCode).to.equal(500);
            expect(res.body.error.category[0].message).to.equal('Specified category does not exist');
            done();
          });
      });
    });

    describe('stand profile field validation', function() {
      beforeEach(function() {
        standData.full_description = null;
      });

      it('should return error message', function(done) {
        agent
          .post('/stands.json')
          .send(standData)
          .end(function(err, res) {
            expect(res.statusCode).to.equal(500);
            expect(res.body.error.full_description[0].message).to.equal('Full description is required');
            done();
          });
      });
    });

    describe('stand attribute validation', function() {
      beforeEach(function() {
        standData.title = null;
      });

      it('should return error message', function(done) {
        agent
          .post('/stands.json')
          .send(standData)
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
        .post('/stands.json')
        .end(function(err, res) {
          expect(res.statusCode).to.eql(403);
          expect(Object.keys(res.body).length).to.equal(0);
          done();
        });
    });
  });
});


describe('DELETE /stands/:id.json', function() {
  var factoryData;

  beforeEach(function(done) {
    DatabaseCleaner.clean(['stands', 'users'], function() {
      done();
    });
  });

  describe('signed in user', function() {
    var user;
    beforeEach(function(done) {
      withSignIn(function(err, data) {
        user = data;
        async.series([
          Factory.create('stand', {user: user.id}),
          Factory.create('stand', {user: user.id})
        ], function(err, data) {
          factoryData = data;
          done();
        });
      });
    });

    it('should delete a stand', function(done) {
      agent
        .del('/stands/' + factoryData[0].id + '.json')
        .send({_csrf: csrfToken})
        .end(function(err, res) {
          expect(res.statusCode).to.eql(200);
          expect(res.body).to.eql({});

          // Making sure stand was deleted from database
          Stand.findOneById(factoryData[0].id).exec(function(err, stand) {
            expect(err).to.be.null;
            expect(stand).to.be.undefined;

            done();
          });
      });
    });

    describe('user does not own a stand', function() {
      beforeEach(function(done) {
        async.series([
          Factory.create('stand', {user: 123})
        ], function(err, data) {
          factoryData = data;
          done();
        });
      });

      it('should return 403 forbidden', function(done) {
        agent
          .del('/stands/' + factoryData[0].id + '.json')
          .send({_csrf: csrfToken})
          .end(function(err, res) {
            expect(res.statusCode).to.eql(403);
            expect(Object.keys(res.body).length).to.equal(0);
            done();
        });
      });
    });
  });

  describe('guest user', function() {
    it('should return 403 forbidden', function(done) {
      agent
        .del('/stands/1.json')
        .send({_csrf: csrfToken})
        .end(function(err, res) {
          expect(res.statusCode).to.eql(403);
          expect(Object.keys(res.body).length).to.equal(0);
          done();
        });
    });
  });
});
