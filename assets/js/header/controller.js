'use strict';

function HeaderCtrl($scope, $rootScope, $location, $timeout,  $http, CurrentUser) {
  /*
   * Sign Out click handler
   *
   */
  $scope.signOut = function() {
    var cb = function() {
      $rootScope.isSignedIn = false;
      $location.path('/home')
      $rootScope.showModal('You have succesfully logged out!','/home');
      CurrentUser.clear();
    };
    $http.delete('/login.json', {
      params: {
        _csrf: SAILS_LOCALS._csrf
      },
    }).success(cb).error(cb);
  };

  /*
   * Header Search Form Handler
   * Sends to a Discover page with a search query
   *
   */
  $scope.headerSearch = function() {
    if ($scope.headerSearchQuery) {
      $location.search('q', $scope.headerSearchQuery).path('/discover');
    }
    return false;
  };
}

HeaderCtrl.$inject = ['$scope', '$rootScope', '$location', '$timeout', '$http', 'CurrentUser'];
myStandControllers.controller('HeaderCtrl', HeaderCtrl);
