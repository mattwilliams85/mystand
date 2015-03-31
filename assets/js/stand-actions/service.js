'use strict';

function StandAction($http, $q) {

  var service = {

    /*
    * Create a Profile
    */
    create: function(data) {
      var dfr = $q.defer();
      data._csrf = SAILS_LOCALS._csrf;

      $http.post('/stands/' + data.id + '/actions.json', data).success(function(res) {
        dfr.resolve(res);
      }).error(function(err) {
        console.log('エラー', err);
        dfr.reject(err);
      });

      return dfr.promise;
    },

    /*
    * Get a list of stand actions
    */
    list: function(id) {
      var dfr = $q.defer();

      $http({
        method: 'GET',
        url: '/stands/' + id + '/actions.json'
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

StandAction.$inject = ['$http', '$q'];
myStandServices.factory('StandAction', StandAction);
