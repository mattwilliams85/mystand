'use strict';

function SignUpCtrl($scope, $rootScope, $location, $timeout,  $http) {
  $scope.newUser = {}

  $scope.userSignUp = function() {
    if($scope.newUser.email && $scope.newUser.password) {
      $http.post('/users.json', {
        _csrf: SAILS_LOCALS._csrf,
        email: $scope.newUser.email,
        password: $scope.newUser.password
      }).
      success(function(data) {
        if (data.error) {
          console.log('invalid username or password')
            // $scope.showModal('Oops, wrong email or password');
            // $(document).foundation();
        } else {
          console.log('newUser created!')
          $location.path('discover')
        }
      }).
      error(function() {
        console.log('Log In Error');
      });
    } else {
      console.log('fields missing')
    }
  };

}

SignUpCtrl.$inject = ['$scope', '$rootScope', '$location', '$timeout', '$http'];
myStandControllers.controller('SignUpCtrl', SignUpCtrl);