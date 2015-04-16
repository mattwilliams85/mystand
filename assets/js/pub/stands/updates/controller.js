'use strict';

function StandUpdatesCtrl($scope, $routeParams, $location, StandUpdate) {

  var createSuccessCallback = function(){
    $location.path('/stands/'+ $routeParams.standId)
  }

  $scope.create = function() {
    console.log('working?')
    StandUpdate.create($scope.newUpdate, $routeParams.standId).then(createSuccessCallback)
  }
}

StandUpdatesCtrl.$inject = ['$scope', '$routeParams', '$location', 'StandUpdate'];
myStandControllers.controller('StandUpdatesCtrl', StandUpdatesCtrl);