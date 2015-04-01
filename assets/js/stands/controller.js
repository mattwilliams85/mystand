'use strict';

function StandsCtrl($rootScope, $scope, $location, $routeParams, Stand, StandUpdate, StandAction, Profile) {
  this.init($scope, $location);
  this.fetch($rootScope, $scope, $location, $routeParams, Stand, StandUpdate, StandAction, Profile);

  $scope.stand = {};
  $scope.author = {};
  $scope.tabData = {};
  $scope.actionUser = {};
  $scope.newAction = {};
  $scope.tabUrl = "assets/templates/stands/details/show.html"

  $scope.changeTab = function(section) {
    if(section === 'updates') {
      StandUpdate.get($routeParams.standId).then(function(data) {
        $scope.tabData = data.standUpdates;
        // console.log($scope.tabData)
      });
    }
    if(section === 'actions') {
      StandAction.list($routeParams.standId).then(function(data) {
        for (var i in data.standActions) {
          data.standActions[i].thumbnail =  "http://img.youtube.com/vi/" +  data.standActions[i].youtube + "/hqdefault.jpg"
          if(data.standActions[i].youtube) data.standActions[i].youtube = 'https://www.youtube.com/embed/' + data.standActions[i].youtube + '?modestbranding=1;controls=1;showinfo=0;rel=0;fs=1';
        }
        console.log(data.standActions)
        $scope.tabData = data.standActions;
      });
    }
    if(section === 'comments') {
      $('.disqus-box').show()
    } else {
      $('.disqus-box').hide()
    }

    $scope.tabUrl =  $scope.createTabUrl(section)
  }

  $scope.createTabUrl = function(section) {
    return "assets/templates/stands/" + section + "/show.html"
  }

  $scope.isActive = function(section) {
    return $scope.createTabUrl(section) === $scope.tabUrl;
  }

  $scope.scrollUp = function() {
    $("body").animate({scrollTop: 0}, "slow");
  }

  $scope.fileUpload = function() {
    if($scope.newAction) {
      $scope.newAction.id = $scope.stand.id
      $scope.newAction.userId = $rootScope.currentUser.id
      StandAction.create($scope.newAction)
      // ADD SUCCESS FAIL OPTIONS WITH .then()
    }
  }

  $scope.onSelect = function(file) {
    $scope.newAction.file = file;
  }

  $scope.takeAction = function() {
    if(!$rootScope.isSignedIn) {
      $('body').scrollTop(0)
      $('#sign-in-modal').foundation('reveal','open');
    } else {
      $('#create-action-modal').foundation('reveal','open');
    }
  }

  $scope.showMedia = function(actionId, userId) {
    Profile.get(userId).then(function(data) {
      $scope.actionUser = data.user;
      console.log($scope.actionUser)
    });
    $('#media-modal-' + actionId).foundation('reveal', 'open', {animation: 'fade'});
  }
}



StandsCtrl.prototype.init = function($scope, $location) {
  // Setting mode based on the url
  $scope.mode = '';
  if (/\/stands/.test($location.path())) return $scope.mode = 'show';
  if (/\/start/.test($location.path())) return $scope.mode = 'new';
};

StandsCtrl.prototype.fetch = function($rootScope, $scope, $location, $routeParams, Stand, StandUpdate, StandAction, Profile) {
  if ($scope.mode === 'show') {

    //Watches and locks Center-Nav-Bar when scrolling down 
    var top = 1050;

    $(window).on('scroll', function () {
      if (top <= $(window).scrollTop()) {
        $('.center-nav-bar').addClass('fixed');
        $('.scroll-top-button').show().css("display","inline-block");
      } else {
        $('.center-nav-bar').removeClass('fixed');
        $('.scroll-top-button').hide()
      }
    })

    Stand.get($routeParams.standId).then(function(data) {
      data.stand.youtube = 'https://www.youtube.com/embed/' + data.stand.youtube + '?modestbranding=1;controls=0;showinfo=0;rel=0;fs=1';
      $scope.stand = data.stand;

      Profile.get(data.stand.user).then(function(data) {
        $scope.author = data.user;
        if($scope.author.bio.length > 50) $scope.author.bio = $scope.author.bio.substring(0,143) + "...";
      });
    });

    angular.element(document).ready(function () {
      var disqus_shortname = 'mystandcomments';
      /* * * DON'T EDIT BELOW THIS LINE * * */
      (function() {
          var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
          dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
          $('#disqus_thread').append(dsq)

      })();
    });
  }

  if ($scope.mode === 'new') {
    $scope.options = {};
    $scope.options.category = [{ label: 'BIOSPHERE', value: 'biosphere'},{ label: 'CLIMATE', value: 'climate'},{ label: 'ENERGY', value: 'energy'},{ label: 'FOOD', value: 'food'},{ label: 'POPULATION', value: 'population'},{ label: 'CONSUMERISM', value: 'consumerism'},{ label: 'POVERTY', value: 'poverty'},{ label: 'SOCIAL JUSTICE', value: 'social justice'},{ label: 'WAR AND CONFLICT', value: 'war and conflict'},{ label: 'SECURE OUR FUTURE', value: 'secure our future'}];
    $scope.options.type = ['PHOTO','VIDEO'];
    $scope.options.duration = ['30 DAYS','60 DAYS','90 DAYS'];
    $scope.options.goal = ['100 ACTIONS','250 ACTIONS','500 ACTIONS'];

    $scope.newStand = {};
    $scope.newStand.category = $scope.options.category[0]
  }
};

StandsCtrl.$inject = ['$rootScope', '$scope', '$location', '$routeParams', 'Stand', 'StandUpdate', 'StandAction', 'Profile'];
myStandControllers.controller('StandsCtrl', StandsCtrl);
