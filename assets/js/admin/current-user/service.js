'use strict';

function CurrentUser($http, $q, $cacheFactory) {
  var cache = $cacheFactory('CurrentUser');
  var isProcessingRequest;

  var service = {

    /*
    * Get user data
    */
    get: function() {
      var dfr = $q.defer();
      var userData = cache.get('data');

      if (isProcessingRequest) {
        dfr.reject('Processing Request ...');
      } else if (userData && userData.email) {
        dfr.resolve(userData);
      } else {
        isProcessingRequest = true;
        $http({
          method: 'GET',
          url: '/profile.json'
        }).success(function(res) {
          cache.put('data', res.user);
          isProcessingRequest = false;
          dfr.resolve(cache.get('data'));
        }).error(function(data, status) {
          isProcessingRequest = false;
          console.log('エラー', data, status);
          dfr.reject(status);
        });
      }

      return dfr.promise;
    },

    /*
    * Clear user data
    */
    clear: function() {
      cache.put('data', {});
      return true;
    }
  };
  return service;
}

CurrentUser.$inject = ['$http', '$q', '$cacheFactory'];
myStandAdminServices.factory('CurrentUser', CurrentUser);
