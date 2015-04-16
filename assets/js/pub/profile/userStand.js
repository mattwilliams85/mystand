'use strict';

function UserStand($http, $q) {

  var service = {

    /*
    * Get featured stands
    */
    index: function(id, opts) {
      var dfr = $q.defer();
      opts = opts || {};
      var params = {};

      if (opts.page && opts.page > 1) params.page = opts.page;
      if (opts.filter) params.filter = opts.filter;

      $http({
        method: 'GET',
        url: '/users/'+id+'/stands.json',
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
    * Get featured stands
    */
    activity: function(id, opts) {
      var dfr = $q.defer();
      opts = opts || {};
      var params = {};

      if (opts.page && opts.page > 1) params.page = opts.page;
      if (opts.filter) params.filter = opts.filter;

      $http({
        method: 'GET',
        url: '/users/'+id+'/stands/activity.json',
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

UserStand.$inject = ['$http', '$q'];
myStandServices.factory('UserStand', UserStand);
