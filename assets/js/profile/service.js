'use strict';

function Profile($http, $q) {

  var service = {

    /*
    * Create a Profile
    */
    create: function(data) {
      var dfr = $q.defer();
      data._csrf = SAILS_LOCALS._csrf;

      $http.post('/users.json', data).success(function(res) {
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
        url: '/users/' + id + '.json'
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

Profile.$inject = ['$http', '$q'];
myStandServices.factory('Profile', Profile);
