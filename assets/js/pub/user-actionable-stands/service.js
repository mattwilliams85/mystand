'use strict';

function UserActionableStand($http, $q) {

  var service = {

    /*
    * Get a list of stand actions
    */
    index: function(userId) {
      var dfr = $q.defer();

      $http({
        method: 'GET',
        url: '/users/' + userId + '/stands/activity.json'
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

UserActionableStand.$inject = ['$http', '$q'];
myStandServices.factory('UserActionableStand', UserActionableStand);
