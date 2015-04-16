'use strict';

function StandUpdatesCtrl($scope, $routeParams, $location, StandUpdate) {
  $scope.test = "hi"

  var createSuccessCallback = function(){
    $location.path('/stands/'+ $routeParams.standId)
  }

  var createFailureCallback = function(){

  }

  $scope.create = function() {
    console.log('working?')
    StandUpdate.create($scope.newUpdate, $routeParams.standId).then(createSuccessCallback, createFailureCallback)
  }
}

StandUpdatesCtrl.$inject = ['$scope', '$routeParams', '$location', 'StandUpdate'];
myStandControllers.controller('StandUpdatesCtrl', StandUpdatesCtrl);