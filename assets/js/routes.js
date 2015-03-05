'use strict';

myStandApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider.
  when('/home', {
    // templateUrl: '/js/landing/templates/index.html',
    template: JST['assets/templates/landing/index.html'],
    controller: 'LandingCtrl'
  }).

  otherwise({
    redirectTo: '/home'
  });

}]);
