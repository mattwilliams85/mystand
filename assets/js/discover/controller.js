'use strict';

function DiscoverCtrl($scope, $routeParams, $timeout, Stand, Category) {
  $scope.stands = [];
  $scope.categories = [];
  $scope.selectedCategories = [];
  $scope.page = 0;
  $scope.searchQuery = $routeParams.q;
  $scope.hoverCategory = null;
  $scope.showLoadMore = true;

  $scope.loadMore = function() {
    $scope.page += 1;
    Stand.list({page: $scope.page, query: $scope.searchQuery, categories: $scope.selectedCategories, sort: $scope.sortBy}).then(function(data) {
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

  $scope.selectSort = function(sort) {
    if (sort === 'newest') {
      $scope.sortBy = null;
    } else {
      $scope.sortBy = sort;
    }
    $scope.stands = [];
    $scope.page = 0;
    $scope.showLoadMore = true;
    $scope.loadMore();
  };

  $scope.selectCategory = function(categoryId) {
    $('.category-'+categoryId+'.color').toggleClass('active')
    if ($scope.selectedCategories.indexOf(categoryId) > -1) {
      $scope.selectedCategories.splice($scope.selectedCategories.indexOf(categoryId), 1);
      $scope.unSelectCategory(categoryId)
      return;
    } 
    $scope.selectedCategories.push(categoryId);
    $scope.stands = [];
    $scope.page = 0;
    $scope.showLoadMore = true;
    $scope.loadMore();
  };

  $scope.unSelectCategory = function(categoryId) {
    $scope.stands = [];
    $scope.page = 0;
    $scope.showLoadMore = true;
    $scope.loadMore();
  };

  $scope.categoryName = function(categoryId) {
    for (var i in $scope.categories) {
      if ($scope.categories[i].id === categoryId) {
        return $scope.categories[i].title;
      }
    }
    return categoryId;
  };

  $scope.unSelectQuery = function() {
    $scope.searchQuery = null;
    $scope.stands = [];
    $scope.page = 0;
    $scope.showLoadMore = true;
    $scope.loadMore();
  };

  $scope.hoverEffect = function(categoryId) {
    $scope.hoverCategory = categoryId
  }

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

  $('.category-bg').hover(function(e){
    $(this).toggleClass('zoom-out')
    $(this).find('.button-title').toggleClass('zoom-in')
  })

};

DiscoverCtrl.$inject = ['$scope', '$routeParams', '$timeout', 'Stand', 'Category'];
myStandControllers.controller('DiscoverCtrl', DiscoverCtrl);
