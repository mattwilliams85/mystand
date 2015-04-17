'use strict';

myStandAdminApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider.
  when('/admin/home', {
    template: JST['assets/templates/admin/home/index.html'],
    controller: 'HomeCtrl'
  }).

  // users
  when('/admin/users', {
    template: JST['assets/templates/admin/users/index.html'],
    controller: 'UsersCtrl'
  }).

  otherwise({
    redirectTo: '/admin/home'
  });

}]);
