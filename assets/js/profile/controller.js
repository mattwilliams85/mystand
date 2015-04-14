'use strict';

function ProfileCtrl($scope, $rootScope, $location, $http, CurrentUser, Profile, UserStand, Stand, Category) {

  $rootScope.tabUrl = "assets/templates/profile/details/show.html"
  $scope.profile = {};
  $scope.profileCopy = {};
  $scope.tabData = {
    manage: [],
    activity: []
  };
  $scope.page = 0;
  $scope.editStand = {};

  $scope.changeTab = function(section) {
    $scope.page = 0;

    if(section === 'details') $location.path('profile/details');
    if(section === 'manage') $location.path('profile/manage');
    if(section === 'activity') $location.path('profile/activity');
    if(section === 'notifications') $location.path('profile/notifications');
  }

  $scope.loadMore = function(tab) {
    $scope.showLoadMore = true;
    $scope.page += 1;

    if(tab === 'manage') {

    }
    if(tab === 'activity') {

    }

    UserStand.index($scope.profile.id, {page: $scope.page, sort: $scope.sortBy, filter: $scope.sortBy}).then(function(data) { 
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

  var updateSuccessCallback = function(data) {
    $scope.editStand = {};
    $scope.page = 0;
    $scope.tabData['manage'] = [];
    $scope.loadMore('manage');
  }

  var updateFailureCallback = function(data) {
    
  }

  $scope.updateStand = function() {
    Stand.update($scope.editStand).then(updateSuccessCallback, updateFailureCallback);
  }

  var publishSuccessCallback = function(data) {
     Stand.publish(data.stand).then($location.path('stands/'+data.stand.id));
  }

  $scope.publishStand = function() {
    if ($scope.editStand) {
      //REGEX for YOUTUBE LINKS
      if($scope.editStand.iamge_original_url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = $scope.editStand.image_original_url.match(regExp);
        if (match && match[2].length == 11) {
          $scope.editStand.image_original_url = "http://img.youtube.com/vi/" + match[2] + "/hqdefault.jpg";
          $scope.editStand.youtube = match[2];
        }
      }
      Stand.create($scope.newStand).then(publishSucessCallback, updateFailureCallback);
    }
  }

  $scope.loadForm = function(id) {
    Stand.get(id).then(function(data) {
      $scope.editStand = data.stand

      if(data.youtube) $scope.editStand.youtube = 'https://www.youtube.com/embed/' + data.youtube;
      for (var key in $scope.options.categories) {
        if(data.stand.category == $scope.options.categories[key].value) $scope.editStand.category = $scope.options.categories[key].id;
      }
    });
  }

  // TURN ME BACK ON!!!
  // $scope.redirectUnlessSignedIn()
  
  this.init($scope, $location);
  this.fetch($scope, $rootScope, $location,  $http, CurrentUser, Profile, UserStand, Stand, Category);
};

ProfileCtrl.prototype.init = function($scope, $location) {
  // Setting mode based on the url
  $scope.mode = '';
  if (/\/profile\/details/.test($location.path())) return $scope.mode = 'details';
  if (/\/profile\/manage/.test($location.path())) return $scope.mode = 'manage';

};

ProfileCtrl.prototype.fetch = function($scope, $rootScope, $location,  $http, CurrentUser, Profile, UserStand, Stand, Category) {

  CurrentUser.get().then(function(data) {
    $rootScope.currentUser = data;
    Profile.get($rootScope.currentUser.id).then(function(data) {
      $scope.profile = data.user;
      //TEMP DATA
      $scope.profile.bystanders = Math.floor((Math.random() * 100) + 1);
      $scope.profile.mystanders = Math.floor((Math.random() * 100) + 1);

      if($scope.mode === "details") {
        
      }

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
    });
  });


};

ProfileCtrl.$inject = ['$scope', '$rootScope', '$location', '$http', 'CurrentUser', 'Profile', 'UserStand', 'Stand','Category'];
myStandControllers.controller('ProfileCtrl', ProfileCtrl);
