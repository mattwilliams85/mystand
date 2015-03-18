'use strict';

 function HeaderCtrl($scope, $rootScope, $location, $timeout) {

   /*
    * User Sign-in Function
    */
    $scope.signOut = function() {
      $rootScope.isSignedIn = false;
    }
 }


 HeaderCtrl.$inject = ['$scope', '$rootScope', '$location', '$timeout'];
 myStandControllers.controller('HeaderCtrl', HeaderCtrl);
