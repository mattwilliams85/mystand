'use strict';

function Category($http, $q) {

  var service = {

    list: function() {
      var dfr = $q.defer();

      $http({
        method: 'GET',
        url: '/categories.json'
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

Category.$inject = ['$http', '$q'];
myStandServices.factory('Category', Category);
