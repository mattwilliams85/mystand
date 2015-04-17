'use strict';

var myStandAdminApp = angular.module('myStandAdminApp', [
  'ngRoute',
  'myStandAdminControllers',
  'myStandAdminServices',
  'textAngular'
]);

myStandAdminApp.run(['$rootScope', '$window', '$location', 'CurrentUser', function ($rootScope, $window, $location, CurrentUser) {
  $rootScope.currentUser = {};

  /*
   * Fill in User object with data
  */
  $rootScope.$on('$includeContentLoaded', function() {
    CurrentUser.get().then(function successCallback(data) {
      $rootScope.currentUser = data;
      // Redirect if not admin
      if (!$rootScope.currentUser.is_admin) $window.location = '/';
    }, function errorCallback(status) {
      // Redirect if not signed in
      if (status === 403) $window.location = '/';
    });
  });

  $rootScope.isCurrentPage = function(path) {
    return $location.path() === path;
  };
}]);

var myStandAdminControllers = angular.module('myStandAdminControllers', []);

var myStandAdminServices = angular.module('myStandAdminServices', ['ngResource']);

myStandAdminApp.config(
  ['$sceProvider', '$httpProvider', function($sceProvider, $httpProvider) {
    $sceProvider.enabled(false);
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-Token';
  }]
);

myStandAdminApp.config(['$provide', function($provide) {
  $provide.decorator('$templateCache', ['$delegate', '$sniffer', function ($delegate, $sniffer) {
    var originalGet = $delegate.get;

    $delegate.get = function(key) {
      var value;
      value = originalGet(key);
      if (!value) {
        // JST is where templates are stored
        // If not already found in the cache, look there...
        value = JST[key]();
        if (value) {
          $delegate.put(key, value);
        }
      }
      return value;
    };

    return $delegate;
  }]);

  return this;
}]);
