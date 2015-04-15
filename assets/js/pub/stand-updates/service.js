'use strict';

function StandUpdate($http, $q) {

  var service = {

    /*
    * Get a stand
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
    }
  };

  return service;
}

StandUpdate.$inject = ['$http', '$q'];
myStandServices.factory('StandUpdate', StandUpdate);
