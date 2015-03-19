'use strict';

function Stand($http, $q) {

  var service = {

    /*
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
