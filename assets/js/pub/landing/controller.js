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
      for (var i in data.trendingStands) {
        if(data.trendingStands[i].title.length > 27) data.trendingStands[i].title = data.trendingStands[i].title.substring(0,24) + "...";
        if(data.trendingStands[i].youtube) {
          data.trendingStands[i].thumbnail = 'http://img.youtube.com/vi/' + data.trendingStands[i].youtube + '/hqdefault.jpg';
        }
      }
    });

    // initialize Featured Stands carousel
    $timeout(function() {
      if(window.innerWidth <= 768) {
        $('.ms-trending-stands').slick({
          centerMode: true,
          draggable: true,
          centerPadding: '25px'
        });
        $('.ms-featured-stands').slick({
          centerMode: true,
          draggable: true,
          centerPadding: '25px'
        });
      } else {
        $('.ms-featured-stands').slick({
          draggable: false,
          prevArrow: '<i class="fa fa-chevron-left carousel-left" style="color:#fff"></i>',
          nextArrow: '<i class="fa fa-chevron-right carousel-right" style="color:#fff"></i>'
        });
      }
    }, 1000);
  }
};


LandingCtrl.$inject = ['$scope', '$location', '$timeout', 'FeaturedStand','TrendingStand'];
myStandControllers.controller('LandingCtrl', LandingCtrl);
