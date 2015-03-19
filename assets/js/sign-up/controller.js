'use strict';

function SignUpCtrl($scope, $rootScope, $http) {
  $scope.user = {};
  debugger
  $scope.signUp = function() {

  }

  // this.init($scope);
  // this.fetch($scope);
}

// SignUpCtrl.prototype.init = function($scope) {
//   // Setting mode based on the url
//   $scope.mode = 'index';
// };

// SignUpCtrl.prototype.fetch = function($scope) {
//   if ($scope.mode === 'index') {
//   }
// };

SignUpCtrl.$inject = ['$scope', '$rootScope', '$http'];
myStandControllers.controller('SignUpCtrl', SignUpCtrl);
