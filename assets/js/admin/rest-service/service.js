'use strict';

function RESTService($http, $q) {

  var service = {

    index: function(resourceName, opts) {
      var dfr = $q.defer();
      opts = opts || {};
      var params = {};
      if (opts.page && opts.page > 1) params.page = opts.page;

      $http({
        method: 'GET',
        url: '/admin/' + resourceName + '.json',
        params: params
      }).success(function(res) {
        dfr.resolve(res);
      }).error(function(err) {
        console.log('エラー', err);
        dfr.reject(err);
      });

      return dfr.promise;
    },

    show: function(resourceName, id) {
      var dfr = $q.defer();

      $http.get('/admin/' + resourceName + '/' + id + '.json')
      .success(function(res) {
        dfr.resolve(res);
      }).error(function(err) {
        console.log('エラー', err);
        dfr.reject(err);
      });

      return dfr.promise;
    },

    create: function(resourceName, data) {
      var dfr = $q.defer();
      data._csrf = SAILS_LOCALS._csrf;

      $http.post('/admin/' + resourceName + '.json', data).success(function(res) {
        dfr.resolve(res);
      }).error(function(err) {
        console.log('エラー', err);
        dfr.reject(err);
      });

      return dfr.promise;
    },

    update: function(resourceName, data) {
      var dfr = $q.defer();
      data._csrf = SAILS_LOCALS._csrf;

      $http.put('/admin/' + resourceName + '/' + data.id + '.json', data).success(function(res) {
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

RESTService.$inject = ['$http', '$q'];
myStandAdminServices.factory('RESTService', RESTService);
