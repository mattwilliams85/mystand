'use strict';

function Stand($http, $q, $sails) {

  var service = {

    /**
     * Get a list of stands
     */
    list: function(opts) {
      var dfr = $q.defer();
      opts = opts || {};
      var params = {};
      if (opts.page && opts.page > 1) params.page = opts.page;
      if (opts.categories && opts.categories.length) params.categories = opts.categories.join(',');
      if (opts.query) params.query = opts.query;
      if (opts.sort) params.sort = opts.sort;

      $http({
        method: 'GET',
        url: '/stands.json',
        params: params
      }).success(function(res) {
        dfr.resolve(res);
      }).error(function(err) {
        console.log('エラー', err);
        dfr.reject(err);
      });

      return dfr.promise;
    },

    /**
     * Create a Stand
     */
    create: function(data) {
      var dfr = $q.defer();
      data._csrf = SAILS_LOCALS._csrf;

      $http.post('/stands.json', data).success(function(res) {
        dfr.resolve(res);
      }).error(function(err) {
        console.log('エラー', err);
        dfr.reject(err);
      });

      return dfr.promise;
    },

    /**
     * Publish a Stand
     */
    publish: function(data) {
      var dfr = $q.defer();
      data._csrf = SAILS_LOCALS._csrf;

      $http({
        method: 'PUT',
        url: '/stands/' + data.id +'/publish.json',
        data: data
      }).success(function(res) {
        dfr.resolve(res);
      }).error(function(err) {
        console.log('エラー', err);
        dfr.reject(err);
      });

      return dfr.promise;
    },

    /*
    * Update a Stand
    */
    update: function(data) {
      var dfr = $q.defer();
      data._csrf = SAILS_LOCALS._csrf;

      $http.put('/stands/' + data.id + '.json', data).success(function(res) {
        dfr.resolve(res);
      }).error(function(err) {
        console.log('エラー', err);
        dfr.reject(err);
      });

      return dfr.promise;
    },

    /*
    * Bookmark a Stand
    */
    bookmark: function(data) {
      var dfr = $q.defer();
      data._csrf = SAILS_LOCALS._csrf;

      $http({
        method: 'POST',
        url: '/stands/' + data.id +'/bookmarks.json',
        data: data
      }).success(function(res) {
        dfr.resolve(res);
      }).error(function(err) {
        console.log('エラー', err);
        dfr.reject(err);
      });

      return dfr.promise;
    },

    /*
    * Close a Stand
    */
    close: function(data) {
    var dfr = $q.defer();
    data._csrf = SAILS_LOCALS._csrf;

    $http.put('/stands/' + data.id + '/close.json', data).success(function(res) {
      dfr.resolve(res);
    }).error(function(err) {
      console.log('エラー', err);
      dfr.reject(err);
    });

    return dfr.promise;
    },

    /**
     * Get a stand
     */
    get: function(id, isSocket) {
      var dfr = $q.defer();

      (isSocket ? $sails : $http).get('/stands/' + id + '.json')
      .success(function(res) {
        dfr.resolve(res);
      })
      .error(function(err) {
        console.log('エラー', err);
        dfr.reject(err);
      });

      return dfr.promise;
    }
  };

  return service;
}

Stand.$inject = ['$http', '$q', '$sails'];
myStandServices.factory('Stand', Stand);
