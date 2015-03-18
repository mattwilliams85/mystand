'use strict';

function DiscoverCtrl($scope) {
  this.init($scope);
  this.fetch($scope);
}

DiscoverCtrl.prototype.init = function($scope) {
  // Setting mode based on the url
  $scope.mode = 'index';
};

DiscoverCtrl.prototype.fetch = function($scope) {
  if ($scope.mode === 'index') {
    $scope.stands = [];
  }
};

DiscoverCtrl.$inject = ['$scope'];
myStandControllers.controller('DiscoverCtrl', DiscoverCtrl);
