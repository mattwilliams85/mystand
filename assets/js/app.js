'use strict';

var myStandApp = angular.module('myStandApp', [
  'ngRoute',
  'myStandControllers',
  'myStandServices'
]);

myStandApp.run(['$rootScope', '$location',
  function ($rootScope, $location) {
    //
  }
]);

var myStandControllers = angular.module('myStandControllers', []);

var myStandServices = angular.module('myStandServices', ['ngResource']);

myStandApp.config(
  ['$sceProvider', '$httpProvider', function($sceProvider, $httpProvider) {
    $sceProvider.enabled(false);
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-Token';
  }]
);

myStandApp.config(['$provide', function($provide) {
  $provide.decorator("$templateCache", ["$delegate", "$sniffer", function ($delegate, $sniffer) {
    var originalGet = $delegate.get;

    $delegate.get = function(key) {
      var value;
      value = originalGet(key);
      if (!value) {
        // JST is where my partials and other templates are stored
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
