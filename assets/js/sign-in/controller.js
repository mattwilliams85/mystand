'use strict';

 function SignInCtrl($scope, $rootScope, $location, $timeout, $http, $route) {

   /*
    * User Sign-in Function
    */
    $scope.signIn = function() {
      if ($scope.user && $scope.user.email && $scope.user.password) {
        $http.post('/login', {
          _csrf: SAILS_LOCALS._csrf,
          email: $scope.user.email,
          password: $scope.user.password,
          remember_me: $scope.user.remember_me
        }).
        success(function(data) {
          if (data.error) {
            // $scope.showModal('Oops, wrong email or password');
            // $(document).foundation();
          } else {
            $rootScope.isSignedIn = true;
            console.log('logged in!');
            $('[data-reveal]').foundation('reveal','close')
            // $scope.redirectToDashboardIfSignedIn();
          }
        }).
        error(function() {
          console.log('Sign In Error');
        });
      } else {
        console.log("username or password invalid")
        // $scope.showValidationMessages = true;
      }
    };
 }


 SignInCtrl.$inject = ['$scope', '$rootScope', '$location', '$timeout', '$http','$route'];
 myStandControllers.controller('SignInCtrl', SignInCtrl);
