'use strict';

function Stand($http, $q) {

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
     * Get a stand
     */
    get: function(id) {
      var dfr = $q.defer();

      $http({
        method: 'GET',
        url: '/stands/' + id + '.json'
      }).success(function(res) {
        dfr.resolve(res);
      }).error(function(err) {
        console.log('エラー', err);
        dfr.reject(err);
      });

      return dfr.promise;
    }
  };

  return service;
}

Stand.$inject = ['$http', '$q'];
myStandServices.factory('Stand', Stand);
