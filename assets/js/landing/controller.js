'use strict';

function LandingCtrl($scope, $location) {
  this.init($scope, $location);
  this.fetch($scope);
}

LandingCtrl.prototype.init = function($scope, $location) {
  // Setting mode based on the url
  $scope.mode = '';
  if (/\/home$/.test($location.path())) return $scope.mode = 'home';
};


LandingCtrl.prototype.fetch = function($scope) {
  if ($scope.mode === 'home') {
    // initialize Featured Stands carousel
    $('.ms-featured-stands').slick({
      draggable: false
    });
  }
};


LandingCtrl.$inject = ['$scope', '$location'];
myStandControllers.controller('LandingCtrl', LandingCtrl);
