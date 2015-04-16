'use strict';

function SignUpCtrl($scope, $rootScope, $location, $timeout,  $http, Profile) {
  $scope.newUser = {}
  $scope.isSubmitDisabled = false;
  $scope.formErrorMessages = {};

  var signUpSuccessCallback = function(data) {
    $location.path('welcome');
  }

  var signUpFailureCallback = function(data) {
    if(data.error) {
      for(var error in data.error) {
        $scope.formErrorMessages[error] = data.error[error][0];
      }
    }
  };

  $scope.userSignUp = function() {
    if ($scope.newUser) {
      $scope.isSubmitDisabled = true;
      Profile.create($scope.newUser).then(signUpSuccessCallback, signUpFailureCallback);
    }
  };

}

SignUpCtrl.$inject = ['$scope', '$rootScope', '$location', '$timeout', '$http', 'Profile'];
myStandControllers.controller('SignUpCtrl', SignUpCtrl)
  .directive('sameAs', function() {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$parsers.unshift(function(viewValue) {
          if (viewValue === attrs.sameAs) {
            ctrl.$setValidity('sameAs', true);
            return viewValue;
          } else {
            ctrl.$setValidity('sameAs', false);
            return undefined;
          }
        });
      }
    };
  });