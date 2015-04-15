'use strict';

myStandAdminApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider.
  when('/admin/home', {
    template: JST['assets/templates/admin/home/index.html'],
    controller: 'HomeCtrl'
  }).

  otherwise({
    redirectTo: '/admin/home'
  });

}]);
