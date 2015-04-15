'use strict';

var myStandAdminApp = angular.module('myStandAdminApp', [
  'ngRoute',
  'myStandAdminControllers',
  'myStandAdminServices',
  'textAngular'
]);

myStandAdminApp.run(['$rootScope', 'CurrentUser',
  function ($rootScope, CurrentUser) {
    $rootScope.currentUser = {};

    /*
     * Fill in User object with data
    */
    $rootScope.$on('$includeContentLoaded', function() {
      CurrentUser.get().then(function(data) {
        $rootScope.currentUser = data;
        // Redirect if not admin
        // if (!$rootScope.currentUser || !$rootScope.currentUser.is_admin) {
          // window.location = '/';
        // }
      });
    });
  }
]);

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
