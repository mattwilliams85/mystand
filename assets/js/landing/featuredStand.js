'use strict';

function FeaturedStand($http, $q) {

  var service = {

    /*
    * Get featured stands
    */
    index: function() {
      var dfr = $q.defer();

      $http({
        method: 'GET',
        url: '/featured-stands.json'
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

FeaturedStand.$inject = ['$http', '$q'];
myStandServices.factory('FeaturedStand', FeaturedStand);
