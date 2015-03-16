'use strict';

function LandingCtrl($scope, $location, $timeout, FeaturedStand, TrendingStand) {
  this.init($scope, $location);
  this.fetch($scope, $timeout, FeaturedStand, TrendingStand);
}

LandingCtrl.prototype.init = function($scope, $location) {
  // Setting mode based on the url
  $scope.mode = '';
  if (/\/home$/.test($location.path())) return $scope.mode = 'home';
};


LandingCtrl.prototype.fetch = function($scope, $timeout, FeaturedStand, TrendingStand) {
  if ($scope.mode === 'home') {
    $scope.featuredStands = [];
    $scope.trendingStands = [];

    FeaturedStand.index().then(function(data) {
      for (var i in data.featuredStands) {
        data.featuredStands[i].youtube = 'https://www.youtube.com/embed/' + data.featuredStands[i].youtube + '?modestbranding=1;controls=0;showinfo=0;rel=0;fs=1';
      }
      $scope.featuredStands = data.featuredStands;
    });

    TrendingStand.index().then(function(data) {
      $scope.trendingStands = data.trendingStands;
    });

    // initialize Featured Stands carousel
    $timeout(function() {
      $('.ms-featured-stands').slick({
        draggable: false
      });
      if(window.innerWidth <= 768) {
        $('.ms-trending-stands').slick({
          centerMode: true,
          draggable: true,
          centerPadding: '25px'
        });
      }
    }, 1000);
  }
};


LandingCtrl.$inject = ['$scope', '$location', '$timeout', 'FeaturedStand','TrendingStand'];
myStandControllers.controller('LandingCtrl', LandingCtrl);
