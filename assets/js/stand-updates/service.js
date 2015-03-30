'use strict';

function StandUpdates($http, $q) {

  var service = {

    /*
    * Get a stand
    */
    get: function(id) {
      var dfr = $q.defer();

      $http({
        method: 'GET',
        url: '/stands/' + id + '/updates.json'
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

StandUpdates.$inject = ['$http', '$q'];
myStandServices.factory('StandUpdates', StandUpdates);