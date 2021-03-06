/*global Stand: true, StandProfile: true */
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
  actions_count: joi.number().integer().required(),
  updates_count: joi.number().integer().required(),
  closed_at: joi.number().integer().required(),
  is_public: joi.boolean()
});

var standFullSchema = standSchema.keys({
  duration: joi.number().integer().required(),
  user: joi.number().integer().required(),
  goal_result: joi.string().required(),
  profile: joi.object({
    full_description: joi.string().required()
  }).required()
});

var standActionSchema = joi.object({
  id: joi.number().integer().required(),
  stand: joi.number().integer().required(),
  user: joi.number().integer().required(),
  image_original_url: joi.string().optional(),
  youtube: joi.string().optional(),
  description: joi.string().optional()
});

var standsSchema = joi.object({
  stands: joi.array().items(standSchema).required()
});


describe('GET /stands.json', function() {
  var factoryData, category;

  beforeEach(function(done) {
    DatabaseCleaner.clean(['stands', 'categories'], function() {

      // Create categories
      async.series([
        Factory.create('category'),
        Factory.create('category')
      ], function(err, data) {
        category = data[0];
        // Create stands with category
        async.series([
          Factory.create('stand', {title: 'mahalo luau', category: category.id}),
          Factory.create('stand', {title: 'luau', category: category.id}),
          Factory.create('stand', {title: 'pakalolo mahalo', category: data[1].id})
        ], function(err, data) {
          factoryData = data;
          done();
        });
      });

    });
  });

  it('should return valid stands data format', function(done) {
    agent.get('/stands.json').end(function(err, res) {
      expect(res.statusCode).to.eql(200);
      var validation = standsSchema.validate(res.body);
      expect(validation.error).to.be.null;
      done();
    });
  });

  it('should return latest stands by default', function(done) {
    agent.get('/stands.json').end(function(err, res) {
      expect(res.statusCode).to.eql(200);
      expect(res.body.stands.length).to.eql(3);
      expect(res.body.stands[0].id).to.eql(factoryData[2].id);
      expect(res.body.stands[1].id).to.eql(factoryData[1].id);
      expect(res.body.stands[2].id).to.eql(factoryData[0].id);
      done();
    });
  });

  it('should return oldest stands from a category', function(done) {
    agent.get('/stands.json')
    .query('sort=oldest&categories=' + category.id)
    .end(function(err, res) {
      expect(res.statusCode).to.eql(200);
      expect(res.body.stands.length).to.eql(2);
      expect(res.body.stands[0].id).to.eql(factoryData[0].id);
      expect(res.body.stands[1].id).to.eql(factoryData[1].id);
      done();
    });
  });

  it('should search stands by a query string', function(done) {
    agent.get('/stands.json')
    .query('query=luau')
    .end(function(err, res) {
      expect(res.statusCode).to.eql(200);
      expect(res.body.stands.length).to.eql(2);
      expect(res.body.stands[0].id).to.eql(factoryData[1].id);
      expect(res.body.stands[1].id).to.eql(factoryData[0].id);
      done();
    });
  });

  it('should search stands by a query string within category', function(done) {
    agent.get('/stands.json')
    .query('query=mahalo&categories=' + category.id)
    .end(function(err, res) {
      expect(res.statusCode).to.eql(200);
      expect(res.body.stands.length).to.eql(1);
      expect(res.body.stands[0].id).to.eql(factoryData[0].id);
      done();
    });
  });
});


describe('GET /stands/:id.json', function() {
  var factoryData;
  beforeEach(function(done) {
    DatabaseCleaner.clean(['users', 'stands', 'stand_profiles', 'categories'], function() {
      // Create category
      Factory.create('category')(function(err, category) {
        // Create stands with category
        async.series([
          Factory.create('stand', {category: category.id}),
          Factory.create('stand', {category: category.id})
        ], function(err, data) {
          factoryData = data;

          // Create stand profile
          Factory.create('standProfile', {stand: factoryData[0].id})(function() {
            done();
          });
        });
      });
    });
  });

  it('should return a stand', function(done) {
    agent.get('/stands/' + factoryData[0].id + '.json').end(function(err, res) {
      expect(res.statusCode).to.eql(200);
      var validation = standFullSchema.validate(res.body.stand);
      expect(validation.error).to.be.null;
      expect(res.body.stand.id).to.eql(factoryData[0].id);
      done();
    });
  });

  describe('signed in user', function() {
    var standAction;

    beforeEach(function(done) {
      withSignIn(function(err, data) {
        async.series([
          Factory.create('standAction', {stand: factoryData[0].id, user: data.id}),
          Factory.create('standAction', {stand: factoryData[1].id, user: data.id})
        ], function(err, data) {
          standAction = data[0];
          done();
        });
      });
    });

    it('should return stand action when user is signed in and has acted on this stand', function(done) {
      agent.get('/stands/' + factoryData[0].id + '.json').end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        var validation;

        validation = standFullSchema.validate(res.body.stand);
        expect(validation.error).to.be.null;
        expect(res.body.stand.id).to.eql(factoryData[0].id);

        validation = standActionSchema.validate(res.body.currentUserStandAction);
        expect(validation.error).to.be.null;
        expect(res.body.currentUserStandAction.id).to.eql(standAction.id);

        done();
      });
    });
  });
});


describe('POST /stands.json', function() {
  var category, standData,
      userData = {
        email: 'email@example.com',
        password: 'password',
        password_confirmation: 'password'
      };

  beforeEach(function(done) {
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
      is_public: false,
      _csrf: csrfToken
    };

    DatabaseCleaner.clean(['stands', 'categories', 'users'], function() {
      async.series([
        Factory.create('user', userData),
        Factory.create('category'),
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
      // standData.youtube = null;
      agent
        .post('/stands.json')
        .send(standData)
        .end(function(err, res) {
          console.log(err, res.body)
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

    xdescribe('image or youtube validation', function() {
      beforeEach(function() {
        standData.youtube = null;
        standData.image_original_url = null;
      });

      it('should return error message cfgfyfhggfh', function(done) {
        agent
          .post('/stands.json')
          .send(standData)
          .end(function(err, res) {
            console.log(err)
            expect(res.statusCode).to.equal(500);
            expect(res.body.error.image_original_url[0].message).to.equal('Image or Youtube link is required');
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


describe('PUT /stands/:id/publish.json', function() {
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
          Factory.create('stand', {user: user.id, is_public: false}),
          Factory.create('stand', {user: user.id, is_public: false})
        ], function(err, data) {
          factoryData = data;
          done();
        });
      });
    });

    it('should publish a stand', function(done) {
      agent
        .put('/stands/' + factoryData[0].id + '/publish.json')
        .send({_csrf: csrfToken})
        .end(function(err, res) {
          expect(res.statusCode).to.eql(200);
          expect(res.body).to.eql({});

          // Making sure stand was published
          Stand.findOneById(factoryData[0].id).exec(function(err, stand) {
            expect(err).to.be.null;
            expect(stand.is_public).to.be.true;
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
          .put('/stands/' + factoryData[0].id + '/publish.json')
          .send({_csrf: csrfToken})
          .end(function(err, res) {
            expect(res.statusCode).to.eql(403);
            expect(Object.keys(res.body).length).to.equal(0);
            done();
        });
      });
    });
  });
});


describe('PUT /stands/:id/unpublish.json', function() {
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
          Factory.create('stand', {user: user.id, is_public: true}),
          Factory.create('stand', {user: user.id, is_public: true})
        ], function(err, data) {
          factoryData = data;
          done();
        });
      });
    });

    it('should unpublish a stand', function(done) {
      agent
        .put('/stands/' + factoryData[0].id + '/unpublish.json')
        .send({_csrf: csrfToken})
        .end(function(err, res) {
          expect(res.statusCode).to.eql(200);
          expect(res.body).to.eql({});

          // Making sure stand was published
          Stand.findOneById(factoryData[0].id).exec(function(err, stand) {
            expect(err).to.be.null;
            expect(stand.is_public).to.be.false;
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
          .put('/stands/' + factoryData[0].id + '/unpublish.json')
          .send({_csrf: csrfToken})
          .end(function(err, res) {
            expect(res.statusCode).to.eql(403);
            expect(Object.keys(res.body).length).to.equal(0);
            done();
        });
      });
    });
  });
});


describe('PUT /stands/:id/close.json', function() {
  var factoryData;

  beforeEach(function(done) {
    DatabaseCleaner.clean(['stands', 'users'], function() {
      done();
    });
  });

  describe('signed in user', function() {
    var user,
        twoDaysFromNow = daysFromDate(new Date(), 2);

    beforeEach(function(done) {
      withSignIn(function(err, data) {
        user = data;
        async.series([
          Factory.create('stand', {user: user.id, closed_at: twoDaysFromNow})
        ], function(err, data) {
          factoryData = data;
          done();
        });
      });
    });

    it('should publish a stand', function(done) {
      agent
      .put('/stands/' + factoryData[0].id + '/close.json')
      .send({_csrf: csrfToken})
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        expect(res.body).to.eql({});

        // Making sure stand was closed
        Stand.findOneById(factoryData[0].id).exec(function(err, stand) {
          expect(err).to.be.null;
          expect(stand.closed_at).to.be.below(new Date());
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
        .put('/stands/' + factoryData[0].id + '/close.json')
        .send({_csrf: csrfToken})
        .end(function(err, res) {
          expect(res.statusCode).to.eql(403);
          expect(Object.keys(res.body).length).to.equal(0);
          done();
        });
      });
    });
  });
});


describe('PUT /stands/:id.json', function() {
  var factoryData, standData;

  beforeEach(function(done) {
    standData = {
      _csrf: csrfToken,
      title: 'New title',
      image_original_url: 'http://eyecuelab.com/newimage.jpg',
      youtube: 'newidhere',
      description: 'newdescr',
      goal_result: 'newresult',
      goal: 101,
      duration: 31,
      profile: {
        full_description: 'newfulldescr'
      }
    };

    DatabaseCleaner.clean(['stands', 'users'], function() {
      done();
    });
  });

  describe('signed in user', function() {
    var user;
    beforeEach(function(done) {
      withSignIn(function(err, data) {
        user = data;
        // Create stand
        async.series([
          Factory.create('stand', {user: user.id}),
          Factory.create('stand', {user: user.id})
        ], function(err, data) {
          factoryData = data;
          standData.category = factoryData[0].category;
          // Create a stand profile
          async.series([
            Factory.create('standProfile', {stand: factoryData[0].id})
          ], function() {
            done();
          });
        });
      });
    });

    it('should update a stand', function(done) {
      agent
      .put('/stands/' + factoryData[0].id + '.json')
      .send(standData)
      .end(function(err, res) {
        expect(res.statusCode).to.eql(200);
        expect(res.body).to.eql({});

        // Making sure stand was updated
        Stand.findOneById(factoryData[0].id).exec(function(err, stand) {
          var savedData = {
            title: stand.title,
            image_original_url: stand.image_original_url,
            category: stand.category,
            youtube: stand.youtube,
            description: stand.description,
            goal_result: stand.goal_result,
            goal: stand.goal,
            duration: stand.duration
          };
          var fullDescription = standData.profile.full_description;
          delete standData._csrf;
          delete standData.profile;
          expect(savedData).to.be.eql(standData);

          // Making sure Stand Profile was updated
          StandProfile.find({stand: factoryData[0].id}).exec(function(err, standProfile) {
            expect(standProfile[0].full_description).to.eql(fullDescription);
            done();
          });
        });
      });
    });

    it('should reset closed_at timestamp based on duration', function(done) {
      var fiveDaysAgo = daysFromDate(new Date(), -5);
      var twoDaysAgo = daysFromDate(new Date(), -2);

      Stand.update({id: factoryData[0].id}, {createdAt: fiveDaysAgo, duration: 1}).exec(function(err) {
        expect(err).to.be.null;

        standData.duration = 3;
        agent
        .put('/stands/' + factoryData[0].id + '.json')
        .send(standData)
        .end(function(err, res) {
          expect(res.statusCode).to.eql(200);

          // Making sure closed_at was updated
          Stand.findOneById(factoryData[0].id).exec(function(err, stand) {
            expect(formattedDate(stand.closed_at)).to.be.eql(formattedDate(twoDaysAgo));
            done();
          });
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
          .put('/stands/' + factoryData[0].id + '.json')
          .send({_csrf: csrfToken})
          .end(function(err, res) {
            expect(res.statusCode).to.eql(403);
            expect(Object.keys(res.body).length).to.equal(0);
            done();
        });
      });
    });
  });
});
