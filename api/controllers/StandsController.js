/*global Stand: true, StandProfile: true, User: true, Category: true */
'use strict';

/**
 * StandsController.js
 *
 */

module.exports = {

  perPage: 16,

  /**
   * @api {get} /stands Stands
   * @apiName GetStands
   * @apiGroup Stands
   *
   * @apiParam {Number} page Page number
   * @apiParam {Number[]} categories Category IDs
   * @apiParam {String} sort Sort type(latest/oldest/popular)
   * @apiParam {String} query Search query
   *
   * @apiSuccess {Object[]} stands List of stands.
   * @apiSuccess {Number} stands.id Stand ID.
   * @apiSuccess {String} stands.title Title.
   * @apiSuccess {String} stands.description Description.
   * @apiSuccess {String} stands.image_original_url Image URL.
   * @apiSuccess {String} stands.youtube Youtube ID.
   * @apiSuccess {Number} stands.goal Goal number.
   * @apiSuccess {String} stands.category Category name.
   * @apiSuccess {Number} stands.actions_count Actions count.
   * @apiSuccess {Number} stands.updates_count Updates count
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *     "stands": [
   *       {
   *         "id": 123,
   *         "title": "Save The Planet",
   *         "description": "Some description",
   *         "image_original_url": "http://www.mystand.herokuapp.com/img.jpg",
   *         "youtube": "43T5K8D3h",
   *         "goal": 100,
   *         "category": "Planet",
   *         "actions_count": 95
   *       }
   *     ]
   *   }
   */
  index: function(req, res) {
    var items = [],
        options = {
          where: {},
          sort: 'id DESC',
          page: req.param('page') || 1,
          limit: this.perPage
        };

    var findStands = function() {
      Stand.find()
      .where(options.where)
      .populate('category')
      .sort(options.sort)
      .paginate({page: options.page, limit: options.limit})
      .exec(function(err, stands) {
        if (err) {
          console.log(err);
          return res.status(500).json({error: 'Database error'});
        }

        for (var stand of stands) {
          items.push(stand.toJSON());
        }
        return res.json({stands: items});
      });
    };

    if (req.param('categories')) options.where.category = req.param('categories').split(',');
    if (req.param('sort') === 'oldest') options.sort = 'id ASC';
    if (req.param('sort') === 'popular') options.sort = 'actions_count DESC';

    if (req.param('query')) {
      Stand.search(req.param('query'), function(err, ids) {
        if (err) {
          console.log(err);
          return res.status(500).json({error: 'Search error'});
        }

        options.where.id = ids;
        return findStands();
      });
    } else {
      return findStands();
    }
  },


  /**
   * @api {get} /stands/:id Show Stand
   * @apiName GetStand
   * @apiGroup Stands
   *
   * @apiParam {Number} id Stand ID
   *
   * @apiSuccess {Object} stand Stand object
   * @apiSuccess {Number} stand.id Stand ID
   * @apiSuccess {String} stand.title Title
   * @apiSuccess {String} stand.description Description
   * @apiSuccess {String} stand.image_original_url Image URL
   * @apiSuccess {String} stand.youtube Youtube ID
   * @apiSuccess {Number} stand.goal Goal number
   * @apiSuccess {String} stand.category Category name
   * @apiSuccess {Number} stand.actions_count Actions count
   * @apiSuccess {Number} stand.updates_count Updates count
   * @apiSuccess {Number} stand.duration Duration in days
   * @apiSuccess {Number} stand.user User ID
   * @apiSuccess {Object} stand.profile Profile object
   * @apiSuccess {String} stand.profile.full_description Full Description
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *     "stand": {
   *       "id": 123,
   *       "title": "Save The Planet",
   *       "description": "Some description",
   *       "image_original_url": "http://www.mystand.herokuapp.com/img.jpg",
   *       "youtube": "43T5K8D3h",
   *       "goal": 100,
   *       "category": "Planet",
   *       "user": 123,
   *       "profile": {
   *         "full_description": "Full description here ...",
   *       },
   *       "actions_count": 95
   *     }
   *   }
   */
  show: function(req, res) {
    Stand.findOneById(req.param('id')).populate('category').populate('profile').exec(function(err, stand) {
      if (err) {
        console.log(err);
        return res.status(500).json({error: 'Database error'});
      }

      return res.json({stand: stand.toJSON({withProfile: true})});
    });
  },


  /**
   * @api {post} /stands Create a Stand
   * @apiName PostStands
   * @apiGroup Stands
   *
   * @apiParam {String} title Title
   * @apiParam {String} description Description
   * @apiParam {String} full_description Full Description
   * @apiParam {String} image_original_url Image url
   * @apiParam {String} youtube Youtube video ID
   * @apiParam {Number} duration Duration in days
   * @apiParam {Number} goal Goal number
   * @apiParam {String} goal_result Goal result
   * @apiParam {Number} category Category ID
   *
   * @apiSuccess {Object} stand Stand object
   * @apiSuccess {Number} stand.id Stand ID
   * @apiSuccess {String} stand.title Title
   * @apiSuccess {String} stand.description Description
   * @apiSuccess {String} stand.image_original_url Image URL
   * @apiSuccess {String} stand.youtube Youtube video ID
   * @apiSuccess {Number} stand.goal Goal number
   * @apiSuccess {String} stand.category Category name
   * @apiSuccess {Number} stand.actions_count Actions count
   * @apiSuccess {Number} stand.updates_count Updates count
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *     "stand": {
   *       "id": 123,
   *       "title": "Save The Planet",
   *       "description": "Some description",
   *       "image_original_url": "http://www.mystand.herokuapp.com/img.jpg",
   *       "youtube": "43T5K8D3h",
   *       "goal": 100,
   *       "category": "Planet",
   *       "actions_count": 95
   *     }
   *   }
   */
  create: function(req, res) {
    var category;
    var createStandProfile = function(stand) {
      StandProfile.create({
        stand: stand.id,
        full_description: req.body.full_description
      })
      .exec(function(err) {
        if (err) return res.status(500).json({error: err.Errors});

        return res.json({stand: stand.toJSON()});
      });
    };

    var createStand = function(currentUser) {
      Stand.create({
        user: currentUser.id,
        title: req.body.title,
        image_original_url: req.body.image_original_url,
        youtube: req.body.youtube,
        description: req.body.description,
        category: req.body.category,
        duration: req.body.duration,
        goal: req.body.goal,
        goal_result: req.body.goal_result
      })
      .exec(function(err, stand) {
        if (err) return res.status(500).json({error: err.Errors});

        stand.category = category;
        return createStandProfile(stand);
      });
    };

    User.auth(req.session.user, function(err, currentUser) {
      if (err) return res.forbidden();

      if (!req.body.category) return res.status(500).json({error: {category: [{message: 'Category is not specified'}]}});

      // Make sure category exist
      Category.findOneById(req.body.category).exec(function(err, data) {
        if (err || !data) return res.status(500).json({error: {category: [{message: 'Specified category does not exist'}]}});
        category = data;

        return createStand(currentUser);
      });
    });
  },


  /**
   * @api {put} /stands/:id/publish Publish a Stand
   * @apiName PublishStand
   * @apiGroup Stands
   *
   * @apiParam {Number} id Stand ID
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {}
   */
  publish: function(req, res) {
    User.auth(req.session.user, function(err, currentUser) {
      if (err) return res.forbidden();

      Stand.findOneById(req.param('id')).exec(function(err, stand) {
        if (err) {
          console.log(err);
          return res.status(500).json({error: 'Database error'});
        }
        if (currentUser.id !== stand.user) return res.forbidden();

        Stand.update({id: stand.id}, {is_public: true}, function(err) {
          if (err) {
            console.log(err);
            return res.status(500).json({error: 'Database error'});
          }

          return res.status(200).end();
        });
      });
    });
  },


  /**
   * @api {put} /stands/:id/unpublish Unpublish a Stand
   * @apiName UnpublishStand
   * @apiGroup Stands
   *
   * @apiParam {Number} id Stand ID
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {}
   */
  unpublish: function(req, res) {
    User.auth(req.session.user, function(err, currentUser) {
      if (err) return res.forbidden();

      Stand.findOneById(req.param('id')).exec(function(err, stand) {
        if (err) {
          console.log(err);
          return res.status(500).json({error: 'Database error'});
        }
        if (currentUser.id !== stand.user) return res.forbidden();

        Stand.update({id: stand.id}, {is_public: false}, function(err) {
          if (err) {
            console.log(err);
            return res.status(500).json({error: 'Database error'});
          }

          return res.status(200).end();
        });
      });
    });
  },


  /**
   * @api {put} /stands/:id Update a Stand
   * @apiName UpdateStand
   * @apiGroup Stands
   *
   * @apiParam {Number} id Stand ID
   * @apiParam {String} title Title
   * @apiParam {String} description Description
   * @apiParam {String} full_description Full Description
   * @apiParam {String} image_original_url Image url
   * @apiParam {String} youtube Youtube video ID
   * @apiParam {Number} duration Duration in days
   * @apiParam {Number} goal Goal number
   * @apiParam {String} goal_result Goal result
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {}
   */
  update: function(req, res) {
    var updateStandProfile = function(stand) {
      StandProfile.update({
        stand: stand.id
      }, {
        full_description: req.body.full_description
      })
      .exec(function(err) {
        if (err) return res.status(500).json({error: err.Errors});

        return res.status(200).end();
      });
    };

    var updateStand = function() {
      Stand.update({
        id: req.param('id')
      }, {
        title: req.body.title,
        image_original_url: req.body.image_original_url,
        youtube: req.body.youtube,
        description: req.body.description,
        duration: req.body.duration,
        goal: req.body.goal,
        goal_result: req.body.goal_result
      })
      .exec(function(err, stand) {
        if (err) return res.status(500).json({error: err.Errors});

        return updateStandProfile(stand[0]);
      });
    };

    User.auth(req.session.user, function(err, currentUser) {
      if (err) return res.forbidden();

      Stand.findOneById(req.param('id')).exec(function(err, stand) {
        if (err) {
          console.log(err);
          return res.status(500).json({error: 'Database error'});
        }
        if (currentUser.id !== stand.user) return res.forbidden();

        return updateStand();
      });
    });
  },


  /**
   * @api {delete} /stands/:id Delete a Stand
   * @apiName DeleteStand
   * @apiGroup Stands
   *
   * @apiParam {Number} id Stand ID
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {}
   */
  destroy: function(req, res) {
    User.auth(req.session.user, function(err, currentUser) {
      if (err) return res.forbidden();

      Stand.findOneById(req.param('id')).exec(function(err, stand) {
        if (err) {
          console.log(err);
          return res.status(500).json({error: 'Database error'});
        }
        if (currentUser.id !== stand.user) return res.forbidden();

        stand.destroy(function(err) {
          if (err) {
            console.log(err);
            return res.status(500).json({error: 'Database error'});
          }

          return res.status(200).end();
        });
      });
    });
  }
};
