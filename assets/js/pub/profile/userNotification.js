'use strict';

function UserNotification($http, $q) {

  var service = {

    /*
    * Update a Notification
    */
    update: function(data) {
      var dfr = $q.defer();

      data._csrf = SAILS_LOCALS._csrf;

      $http.put('/users/' + data.user + '/notifications.json', data).success(function(res) {
        dfr.resolve(res);
      }).error(function(err) {
        console.log('エラー', err);
        dfr.reject(err);
      });

      return dfr.promise;
    },

    /*
    * Get User Notifications
    */
    get: function(id) {
      var dfr = $q.defer();

      $http({
        method: 'GET',
        url: '/users/' + id + '/notifications.json'
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

UserNotification.$inject = ['$http', '$q'];
myStandServices.factory('UserNotification', UserNotification);
