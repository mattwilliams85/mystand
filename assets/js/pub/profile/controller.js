'use strict';

function ProfileCtrl($scope, $rootScope, $location, $http, CurrentUser, Profile, UserStand, UserBookmark, Stand, Category) {

  $rootScope.tabUrl = "assets/templates/profile/bio/show.html"
  $scope.profile = {};
  $scope.profileCopy = {};
  $scope.tabData = {
    manage: [],
    activity: []
  };
  $scope.page = 0;

  // $scope.changeTab = function(section) {
  //   $scope.page = 0;
  //   $scope.mode = section
  //   if (section === 'bio') $location.path()
  //   $location.path('profile/' + section);
  // }

  $scope.selectSort = function(sort) {
    if (sort === 'active') {
      $scope.filter = null;
    } else {
      $scope.filter = sort;
    }
    $scope.tabData['manage'] = [];
    $scope.page = 0;
    $scope.showLoadMore = true;
    $scope.loadMore('manage');
  };

  $scope.loadMore = function(tab) {
    $scope.showLoadMore = true;
    $scope.page += 1;

    if(tab === 'manage') {
      UserStand.index($scope.profile.id, {page: $scope.page, sort: $scope.sortBy, filter: $scope.filter}).then(function(data) {
        for (var i in data.stands) {
          // Calculate progress
          data.stands[i].progressPercent = Math.round((data.stands[i].actions_count*100)/data.stands[i].goal);
        }

        if ($scope.tabData[tab].length === 0) {
          $scope.tabData[tab] = data.stands
        } else {
          $scope.tabData[tab] = $scope.tabData[tab].concat(data.stands);
        }

        // console.log($scope.tabData[tab])

        if ($scope.page === 1 && $scope.stands < 12) {
          $scope.showLoadMore = false;
        } else if (data.stands.length < 12) {
          $scope.showLoadMore = false;
        }
      });
    }
    if(tab === 'activity') {
      UserBookmark.index($scope.profile.id).then(function(data) {
        for (var i in data.stands) {
          // Calculate progress
          data.stands[i].progressPercent = Math.round((data.stands[i].actions_count*100)/data.stands[i].goal);
          // Calculate remaining days
          data.stands[i].days_count = Math.round((Math.abs(Date.now() - data.stands[i].closed_at) / 86400000));
        }

        if ($scope.tabData[tab].length === 0) {
          $scope.tabData[tab] = data.stands
        } else {
          $scope.tabData[tab] = $scope.tabData[tab].concat(data.stands);
        }

        // console.log($scope.tabData[tab])

        if ($scope.page === 1 && $scope.stands < 12) {
          $scope.showLoadMore = false;
        } else if (data.stands.length < 12) {
          $scope.showLoadMore = false;
        }
      console.log($scope.tabData[tab])
      })
    }

  };

  $scope.backup = function(profile) {
    $scope.profileCopy = angular.copy(profile);
  }

  $scope.reset = function() {
    angular.copy($scope.profileCopy, $scope.profile)
  }

  $scope.updateProfile = function() {
    Profile.update($scope.profile);
  }

  // var publishSuccessCallback = function(data) {
  //    Stand.publish(data.stand).then($location.path('stands/'+data.stand.id));
  // }

  // $scope.publishStand = function() {
  //   if ($scope.editStand) {
  //     //REGEX for YOUTUBE LINKS
  //     if($scope.editStand.iamge_original_url) {
  //       var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  //       var match = $scope.editStand.image_original_url.match(regExp);
  //       if (match && match[2].length == 11) {
  //         $scope.editStand.image_original_url = "http://img.youtube.com/vi/" + match[2] + "/hqdefault.jpg";
  //         $scope.editStand.youtube = match[2];
  //       }
  //     }
  //     Stand.create($scope.newStand).then(publishSucessCallback, updateFailureCallback);
  //   }
  // }

  $scope.loadForm = function(id) {

  }

  // TURN ME BACK ON!!!
  // $scope.redirectUnlessSignedIn()

  this.init($scope, $location);
  this.fetch($scope, $rootScope, $location,  $http, CurrentUser, Profile, UserStand, Stand, UserBookmark, Category);
};

ProfileCtrl.prototype.init = function($scope, $location) {
  // Setting mode based on the url
  $scope.mode = '';
  if (/\/profile$/.test($location.path())) return $scope.mode = 'bio';
  if (/\/profile\/manage/.test($location.path())) return $scope.mode = 'manage';
  if (/\/profile\/activity/.test($location.path())) return $scope.mode = 'activity';
  if (/\/profile\/notifications/.test($location.path())) return $scope.mode = 'notifications';
};

ProfileCtrl.prototype.fetch = function($scope, $rootScope, $location,  $http, CurrentUser, Profile, UserStand, UserBookmark, Stand, Category) {

  CurrentUser.get().then(function(data) {
    $rootScope.currentUser = data;
      angular.copy($rootScope.currentUser, $scope.profile);

      if($scope.mode === "manage") {
        $scope.options = {};
        $scope.options.categories = [];
        $scope.options.type = [{label: 'photo', value: 'photo'}, {label: 'video', value: 'video'}];
        $scope.options.duration = [{label: '30 days', value: 30}, {label: '60 days', value: 60}, {label: '90 days', value: 90}];
        $scope.options.goal = [{label: '100 actions', value: 100}, {label: '300 actions', value: 300}, {label: '500 actions', value: 500}, {label: '1000 actions', value: 1000}];

        Category.list().then(function(data) {
          for(var i in data.categories) {
            $scope.options.categories.push({label: data.categories[i].title, value: data.categories[i].title, id: data.categories[i].id});
          }
        });
        $scope.loadMore('manage');
      }
      if($scope.mode === "activity") {
        $scope.loadMore('activity');
      }
  });
};

ProfileCtrl.$inject = ['$scope', '$rootScope', '$location', '$http', 'CurrentUser', 'Profile', 'UserStand', 'UserBookmark', 'Stand','Category'];
myStandControllers.controller('ProfileCtrl', ProfileCtrl);
