'use strict';

myStandApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider.
  when('/home', {
    template: JST['assets/templates/landing/index.html'],
    controller: 'LandingCtrl'
  }).

  when('/discover', {
    template: JST['assets/templates/discover/index.html'],
    controller: 'DiscoverCtrl'
  }).

  when('/stands/:standId', {
    template: JST['assets/templates/stands/show.html'],
    controller: 'StandsCtrl'
  }).

  otherwise({
    redirectTo: '/home'
  });

}]);
