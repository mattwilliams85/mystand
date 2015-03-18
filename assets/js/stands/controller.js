'use strict';

function StandsCtrl($scope) {
  this.init($scope);
  this.fetch($scope);
}

StandsCtrl.prototype.init = function($scope) {
  // Setting mode based on the url
  $scope.mode = 'show';
};

StandsCtrl.prototype.fetch = function($scope) {
  if ($scope.mode === 'show') {
    $scope.stand = {};
  }
};

StandsCtrl.$inject = ['$scope'];
myStandControllers.controller('StandsCtrl', StandsCtrl);
