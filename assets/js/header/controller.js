'use strict';

 function HeaderCtrl($scope, $location, $timeout) {

   /*
    * User Sign-in Function
    */
    $scope.signOut = function() {
      $scope.isSignedIn = false;
    }
 }


 HeaderCtrl.$inject = ['$scope', '$location', '$timeout'];
 myStandControllers.controller('HeaderCtrl', HeaderCtrl);
