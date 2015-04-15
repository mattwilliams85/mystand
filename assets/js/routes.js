'use strict';

myStandApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider.
  when('/home', {
    template: JST['assets/templates/landing/index.html'],
    controller: 'LandingCtrl'
  }).

  when('/discover', {
    template: JST['assets/templates/discover/index.html'],
    controller: 'DiscoverCtrl'
  }).

  when('/sign-up', {
    template: JST['assets/templates/sign-up/new.html'],
    controller: 'SignUpCtrl'
  }).

  when('/welcome', {
    template: JST['assets/templates/sign-up/show.html'],
    controller: 'SignUpCtrl'
  }).

  when('/stands/:standId', {
    template: JST['assets/templates/stands/show.html'],
    controller: 'StandsCtrl'
  }).

  when('/stands/:standId/edit', {
    template: JST['assets/templates/stands/edit.html'],
    controller: 'StandsCtrl'
  }).

  //PROFILE ROUTES

  when('/profile', {
    template: JST['assets/templates/profile/bio/show.html'],
    controller: 'ProfileCtrl'
  }).

  when('/profile/manage', {
    template: JST['assets/templates/profile/manage/show.html'],
    controller: 'ProfileCtrl'
  }).

  when('/profile/activity', {
    template: JST['assets/templates/profile/activity/show.html'],
    controller: 'ProfileCtrl'
  }).

  when('/profile/notifications', {
    template: JST['assets/templates/profile/notifications/show.html'],
    controller: 'ProfileCtrl'
  }).

  //

  when('/start', {
    template: JST['assets/templates/stands/new.html'],
    controller: 'StandsCtrl'
  }).

  otherwise({
    redirectTo: '/home'
  });

}]);
