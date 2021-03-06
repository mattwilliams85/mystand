'use strict';

function ProfileCtrl($scope, $rootScope, $location, CurrentUser, Profile, UserStand, UserBookmark, UserNotification, Category) {

  $rootScope.tabUrl = "assets/templates/pub/profile/bio/show.html"
  $scope.profile = {};
  $scope.profileCopy = {};
  $scope.tabData = {
    manage: [],
    activity: []
  };
  $scope.page = 0;
  $scope.notif = {};

  // Redirects if not signed in
  $scope.redirectUnlessSignedIn()

  $scope.selectSort = function(sort) {
    $scope.filter = sort;
    $scope.page = 0;
    $scope.showLoadMore = true;

    $scope.tabData[$scope.mode] = [];
    $scope.loadMore($scope.mode);
  };

  $scope.loadMore = function(tab) {
    $scope.showLoadMore = true;
    $scope.page += 1;

    if(tab === 'manage') {
      UserStand.index($scope.profile.id, {page: $scope.page, filter: $scope.filter}).then(function(data) {
        for (var i in data.stands) {
          // Calculate progress
          data.stands[i].progressPercent = Math.round((data.stands[i].actions_count*100)/data.stands[i].goal);
        }

        if ($scope.tabData[tab].length === 0) {
          $scope.tabData[tab] = data.stands
        } else {
          $scope.tabData[tab] = $scope.tabData[tab].concat(data.stands);
        }

        if ($scope.page === 1 && $scope.stands < 12) {
          $scope.showLoadMore = false;
        } else if (data.stands.length < 12) {
          $scope.showLoadMore = false;
        }
      });
    }
    if(tab === 'activity') {
      if($scope.filter === 'bookmark') {
        console.log('active or closed')
        UserBookmark.index($scope.profile.id, {page: $scope.page}).then(function(data) {
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

          if ($scope.page === 1 && $scope.stands < 12) {
            $scope.showLoadMore = false;
          } else if (data.stands.length < 12) {
            $scope.showLoadMore = false;
          }
        })
      } else {
        UserStand.activity($scope.profile.id, {page: $scope.page, filter: $scope.filter}).then(function(data) {
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

          if ($scope.page === 1 && $scope.stands < 12) {
            $scope.showLoadMore = false;
          } else if (data.stands.length < 12) {
            $scope.showLoadMore = false;
          }
        })
      }
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

  $scope.updateNotifications = function() {
    UserNotification.update($scope.notif);
  }

  this.init($scope, $location);
  this.fetch($scope, $rootScope, $location, CurrentUser, Profile, UserStand, UserBookmark, UserNotification, Category);
};

ProfileCtrl.prototype.init = function($scope, $location) {
  // Setting mode based on the url
  $scope.mode = '';
  if (/\/profile$/.test($location.path())) return $scope.mode = 'bio';
  if (/\/profile\/manage/.test($location.path())) return $scope.mode = 'manage';
  if (/\/profile\/activity/.test($location.path())) return $scope.mode = 'activity';
  if (/\/profile\/notifications/.test($location.path())) return $scope.mode = 'notifications';
};

ProfileCtrl.prototype.fetch = function($scope, $rootScope, $location, CurrentUser, Profile, UserStand, UserBookmark, UserNotification, Category) {

  CurrentUser.get().then(function(data) {
    if (!data.mystanders) data.mystanders = 0; 
    if (!data.bystanders) data.bystanders = 0; 
    $rootScope.currentUser = data;
      angular.copy($rootScope.currentUser, $scope.profile);

      if($scope.mode === "manage") {
        $scope.options = {};
        $scope.options.categories = [];
        $scope.options.type = [{label: 'photo', value: 'photo'}, {label: 'video', value: 'video'}];
        $scope.options.duration = [{label: '30 days', value: 30}, {label: '60 days', value: 60}, {label: '90 days', value: 90}];
        $scope.options.goal = [{label: '100 actions', value: 100}, {label: '300 actions', value: 300}, {label: '500 actions', value: 500}, {label: '1000 actions', value: 1000}];

        $scope.loadMore('manage');
      }

      if($scope.mode === "activity") {
        $scope.loadMore('activity');
      }

      if($scope.mode === 'notifications') {
        UserNotification.get($scope.profile.id).then(function(data){
          $scope.notif = data.userNotifications;
          $scope.notif.user = $scope.profile.id;
        })
      }
  });
};

ProfileCtrl.$inject = ['$scope', '$rootScope', '$location', 'CurrentUser', 'Profile', 'UserStand', 'UserBookmark', 'UserNotification', 'Category'];
myStandControllers.controller('ProfileCtrl', ProfileCtrl);
