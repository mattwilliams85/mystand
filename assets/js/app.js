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
