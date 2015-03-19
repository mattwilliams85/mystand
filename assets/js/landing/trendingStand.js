'use strict';

function TrendingStand($http, $q) {

  var service = {

    /*
    * Get featured stands
    */
    index: function() {
      var dfr = $q.defer();

      $http({
        method: 'GET',
        url: '/trending-stands'
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

TrendingStand.$inject = ['$http', '$q'];
myStandServices.factory('TrendingStand', TrendingStand);
