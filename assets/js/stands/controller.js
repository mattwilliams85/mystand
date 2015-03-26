'use strict';

function StandsCtrl($scope, $location, $routeParams, Stand) {
  this.init($scope);
  this.fetch($scope, $location, $routeParams, Stand);
}

StandsCtrl.prototype.init = function($scope) {
  // Setting mode based on the url
  $scope.mode = 'show';
};

StandsCtrl.prototype.fetch = function($scope, $location, $routeParams, Stand) {
  if ($scope.mode === 'show') {
    $scope.stand = {};
    $scope.author = {};

    Stand.get($routeParams.standId).then(function(data) {
      data.stand.youtube = 'https://www.youtube.com/embed/' + data.stand.youtube + '?modestbranding=1;controls=0;showinfo=0;rel=0;fs=1';
      $scope.stand = data.stand;
      console.log($scope.stand)
    });

    
  }
};

StandsCtrl.$inject = ['$scope', '$location', '$routeParams', 'Stand'];
myStandControllers.controller('StandsCtrl', StandsCtrl);
