'use strict';

function StandUpdate($http, $q) {

  var service = {

    /*
    * Get list of updates
    */
    list: function(id, opts) {
      var dfr = $q.defer();
      opts = opts || {};
      var params = {};

      if (opts.page && opts.page > 1) params.page = opts.page;

      $http({
        method: 'GET',
        url: '/stands/' + id + '/updates.json',
        params: params
      }).success(function(res) {
        dfr.resolve(res);
      }).error(function(err) {
        console.log('エラー', err);
        dfr.reject(err);
      });

      return dfr.promise;
    },

    /*
     * Create an update
     */
    create: function(data, standId) {
      var dfr = $q.defer();
      data._csrf = SAILS_LOCALS._csrf;

      $http.post('/stands/'+ standId +'/updates.json', data).success(function(res) {
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

StandUpdate.$inject = ['$http', '$q'];
myStandServices.factory('StandUpdate', StandUpdate);
