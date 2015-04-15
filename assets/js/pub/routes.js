'use strict';

myStandApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider.
  when('/home', {
    template: JST['assets/templates/pub/landing/index.html'],
    controller: 'LandingCtrl'
  }).

  when('/discover', {
    template: JST['assets/templates/pub/discover/index.html'],
    controller: 'DiscoverCtrl'
  }).

  when('/sign-up', {
    template: JST['assets/templates/pub/sign-up/new.html'],
    controller: 'SignUpCtrl'
  }).

  when('/welcome', {
    template: JST['assets/templates/pub/sign-up/show.html'],
    controller: 'SignUpCtrl'
  }).

  when('/stands/:standId', {
    template: JST['assets/templates/pub/stands/show.html'],
    controller: 'StandsCtrl'
  }).

  when('/stands/:standId/edit', {
    template: JST['assets/templates/pub/stands/edit.html'],
    controller: 'StandsCtrl'
  }).

  //PROFILE ROUTES

  when('/profile', {
    template: JST['assets/templates/profile/bio/show.html'],
    controller: 'ProfileCtrl'
  }).

  when('/profile/manage', {
    template: JST['assets/templates/pub/profile/manage/show.html'],
    controller: 'ProfileCtrl'
  }).

  when('/profile/activity', {
    template: JST['assets/templates/pub/profile/activity/show.html'],
    controller: 'ProfileCtrl'
  }).

  when('/profile/notifications', {
    template: JST['assets/templates/pub/profile/notifications/show.html'],
    controller: 'ProfileCtrl'
  }).

  //

  when('/start', {
    template: JST['assets/templates/pub/stands/new.html'],
    controller: 'StandsCtrl'
  }).

  otherwise({
    redirectTo: '/home'
  });

}]);
