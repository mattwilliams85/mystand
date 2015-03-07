'use strict';

myStandApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider.
  when('/home', {
    template: JST['assets/templates/landing/index.html'],
    controller: 'LandingCtrl'
  }).

  otherwise({
    redirectTo: '/home'
  });

}]);
