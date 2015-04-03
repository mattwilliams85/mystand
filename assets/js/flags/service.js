'use strict';

function Flag($http, $q) {

  var service = {

    /*
    * Create a Flag
    */
    create: function(data) {
      var dfr = $q.defer();
      data._csrf = SAILS_LOCALS._csrf;

      $http.post('/flags.json', data).success(function(res) {
        dfr.resolve(res);
      }).error(function(err) {
        console.log('エラー', err);
        dfr.reject(err);
      });

      return dfr.promise;
    },

    get: function(id) {
      var dfr = $q.defer();

      $http({
        method: 'GET',
        url: '/flags.json'
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

Flag.$inject = ['$http', '$q'];
myStandServices.factory('Flag', Flag);
