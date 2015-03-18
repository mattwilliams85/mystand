'use strict';

 function HeaderCtrl($scope, $rootScope, $location, $timeout,  $http, CurrentUser) {

   /*
    * User Sign-in Function
    */
    $scope.signOut = function() {
      var cb = function() {
        $rootScope.isSignedIn = false;
        $('#logout-modal').foundation('reveal','open');
        CurrentUser.clear();
      };
      $http.delete('/login', {
        params: {
          _csrf: SAILS_LOCALS._csrf
        },
      }).success(cb).error(cb);
    }
 }


 HeaderCtrl.$inject = ['$scope', '$rootScope', '$location', '$timeout', '$http', 'CurrentUser'];
 myStandControllers.controller('HeaderCtrl', HeaderCtrl);
