'use strict';

/*
 * Stand.js
 *
*/

var presenter = require(__dirname + '/../presenters/StandPresenter');
var seeder = require(__dirname + '/../seeds/StandSeed');

var search = require(__dirname + '/../services/RedisSearchService').createStandsSearch();

module.exports = {

  tableName: 'stands',

  attributes: {
    user: {
      model: 'User',
      required: true
    },
    category: {
      model: 'Category',
      required: true
    },
    profile: {
      model: 'StandProfile'
    },
    title: {
      type: 'string',
      required: true
    },
    image_original_url: {
      type: 'string',
      required: true
    },
    youtube: {
      type: 'string'
    },
    description: {
      type: 'string',
      required: true
    },
    goal_result: {
      type: 'string',
      required: true
    },
    goal: {
      type: 'integer',
      required: true
    },
    actions_count: {
      type: 'integer'
    },
    updates_count: {
      type: 'integer'
    },
    duration: {
      type: 'integer',
      required: true
    },
    is_public: {
      type: 'boolean'
    },

    toJSON: presenter,

    /**
     * Update search index
     *
     */
    updateSearchIndex: function(callback) {
      var that = this,
          searchText;

      if (this.id) {
        // Remove all indexed data for the stand by it's id
        search.remove(this.id, function() {
          // Create a new index of a stand
          searchText = that.title + ' ' + that.description;
          search.index(searchText, that.id, function() {
            return callback();
          });
        });
      } else {
        return callback('Can not index a stand without id');
      }
    }
  },

  validationMessages: {
    user: {
      required: 'User is required'
    },
    category: {
      required: 'Category is required'
    },
    title: {
      required: 'Title is required'
    },
    image_original_url: {
      required: 'Image is required'
    },
    description: {
      required: 'Description is required'
    },
    goal_result: {
      required: 'Goal result is required'
    },
    goal: {
      required: 'Goal is required'
    },
    duration: {
      required: 'Duration is required'
    }
  },

  /**
   * Lifecycle Callbacks
   *
   */
  afterCreate: function(stand, callback) {
    stand.updateSearchIndex = this.attributes.updateSearchIndex;
    stand.updateSearchIndex(function() {
      return callback();
    });
  },
  afterUpdate: function(stand, callback) {
    // TODO: make sure it only runs reindex when title and description changes
    stand.updateSearchIndex = this.attributes.updateSearchIndex;
    stand.updateSearchIndex(function() {
      return callback();
    });
  },
  afterDestroy: function(records, callback) {
    for (var stand of records) {
      // Remove all indexed data for the stand by it's id
      search.remove(stand.id, callback);
    }
  },

  /**
   * Search stands by a query string
   * Returns an array of stand ids
   *
   * @return {Array}
   */
  search: function(query, callback) {
    search.query(query).type('or').between(0, 100).end(function(err, ids) {
      if (err) {
        console.log('Error searching stands for: ' + query, err);
        return callback('Error searching stands for: ' + query);
      }
      return callback(null, ids);
    });
  },

  seedData: seeder.data
};
