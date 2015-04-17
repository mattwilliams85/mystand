'use strict';

function UsersCtrl($scope, $location, $routeParams, RESTService) {
  $scope.users = [];
  $scope.page = 0;
  $scope.showLoadMore = true;

  $scope.loadMore = function() {
    $scope.page += 1;
    RESTService.index('users', {page: $scope.page}).then(function(data) {
      $scope.users = $scope.users.concat(data.users);
      if ($scope.page === 1 && $scope.users < 20) {
        $scope.showLoadMore = false;
      } else if (data.users.length < 20) {
        $scope.showLoadMore = false;
      }
    });
  };

  $scope.paginationPrev = function() {
    $scope.page -= 2;
    $scope.loadMore();
  };

  $scope.paginationNext = function() {
    $scope.loadMore();
  };

  this.init($scope, $location);
  this.fetch($scope, $routeParams, RESTService);
}

UsersCtrl.prototype.init = function($scope, $location) {
  $scope.mode = 'index';
  if (/\/users\//.test($location.path())) return $scope.mode = 'show';
  if (/\/edit$/.test($location.path())) return $scope.mode = 'edit';
};

UsersCtrl.prototype.fetch = function($scope, $routeParams, RESTService) {
  if ($scope.mode === 'index') {
    $scope.loadMore();
  } else {
    RESTService.show('users', $routeParams.id).then(function successCallback(data) {
      $scope.user = data.user;
    });
  }
};

UsersCtrl.$inject = ['$scope', '$location', '$routeParams', 'RESTService'];
myStandAdminControllers.controller('UsersCtrl', UsersCtrl);
