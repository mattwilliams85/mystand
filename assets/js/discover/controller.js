'use strict';

function DiscoverCtrl($scope, $routeParams, $timeout, Stand, Category) {
  $scope.stands = [];
  $scope.categories = [];
  $scope.selectedCategories = [];
  $scope.page = 0;
  $scope.searchQuery = $routeParams.q;
  $scope.showLoadMore = true;

  $scope.loadMore = function() {
    $scope.page += 1;
    Stand.list({page: $scope.page, query: $scope.searchQuery, categories: $scope.selectedCategories}).then(function(data) {
      for (var i in data.stands) {
        // Calculate progress
        data.stands[i].progressPercent = Math.round((data.stands[i].actions_count*100)/data.stands[i].goal);
      }
      $scope.stands = $scope.stands.concat(data.stands);

      if ($scope.page === 1 && $scope.stands < 16) {
        $scope.showLoadMore = false;
      } else if (data.stands.length < 16) {
        $scope.showLoadMore = false;
      }
    });
  };

  $scope.selectCategory = function(categoryId) {
    $scope.stands = [];
    $scope.page = 0;
    $scope.selectedCategories.push(categoryId);
    $scope.showLoadMore = true;
    $scope.loadMore();
  };

  $scope.$on('headerSearchSubmit', function(event, args) {
    $scope.searchQuery = args.query;
    $scope.stands = [];
    $scope.page = 0;
    $scope.selectedCategories = [];
    $scope.showLoadMore = true;
    $scope.loadMore();
  });

  this.fetch($scope, Category);
}

DiscoverCtrl.prototype.fetch = function($scope, Category) {
  $scope.loadMore();

  Category.list().then(function(data) {
    $scope.categories = data.categories;
  });
};

DiscoverCtrl.$inject = ['$scope', '$routeParams', '$timeout', 'Stand', 'Category'];
myStandControllers.controller('DiscoverCtrl', DiscoverCtrl);
