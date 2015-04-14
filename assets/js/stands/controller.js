'use strict';

function StandsCtrl($rootScope, $scope, $location, $routeParams, Stand, StandUpdate, StandAction, Profile, Category, Flag) {
  this.init($scope, $location);
  this.fetch($rootScope, $scope, $location, $routeParams, Stand, StandUpdate, StandAction, Profile, Category);

  $scope.stand = {};
  $scope.author = {};
  $scope.tabData = {
    actions: [],
    updates: []
  };
  $scope.actionUser = {};
  $scope.newAction = {};
  $scope.tabUrl = 'assets/templates/stands/details/show.html';
  $scope.formErrorMessages = {};
  $scope.page = 0;

  // Listen for updates
  $scope.listenToModel('stand', function(message) {
    console.log('received message', message.data);
    if (message.verb === 'updated') {
      $scope.stand.actions_count = message.data.actions_count;
    }
  });

  $scope.changeTab = function(section) {
    $scope.page = 0;

    if (section === 'details') {
      $scope.tabUrl =  $scope.createTabUrl(section);
    } else if (section === 'updates') {
      $scope.tabData.updates = [];
      $scope.loadMore('updates');
    } else if (section === 'actions') {
      $scope.tabData.actions = [];
      $scope.loadMore('actions');
    } else if (section === 'comments') {
      $scope.tabUrl =  $scope.createTabUrl(section);
      $('.disqus-box').show();
    } else {
      $('.disqus-box').hide();
    }
  };

  $scope.createTabUrl = function(section) {
    return 'assets/templates/stands/' + section + '/show.html';
  };

  $scope.isActive = function(section) {
    return $scope.createTabUrl(section) === $scope.tabUrl;
  };

  $scope.scrollUp = function() {
    $('body').animate({scrollTop: 0}, 'slow');
  };

  $scope.fileUpload = function() {
    if ($scope.newAction) {
      $scope.newAction.id = $scope.stand.id;
      $scope.newAction.userId = $rootScope.currentUser.id;
      if ($scope.newAction.youtube) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = $scope.newAction.youtube.match(regExp);
        if (match && match[2].length === 11) {
          $scope.newAction.youtube = match[2];
        }
      }
      StandAction.create($scope.newAction).then(function() {
        $scope.changeTab('actions');
      });
    }
  };

  $scope.onSelect = function(file) {
    $scope.newAction.file = file;
  };

  $scope.bookmarkStand = function() {
    Stand.bookmark($scope.stand);
  };

  $scope.flagStand = function() {
    var flag = {
      user: $rootScope.currentUser.id,
      contentId: $scope.stand.id,
      contentType: 'Stand'
    };
    Flag.create(flag);
  };

  $scope.takeAction = function() {
    if(!$rootScope.isSignedIn) {
      $('body').scrollTop(0);
      $('#sign-in-modal').foundation('reveal','open');
    } else {
      $('#create-action-modal').foundation('reveal','open');
    }
  };

  $scope.showMedia = function(actionId, userId) {
    Profile.get(userId).then(function(data) {
      $scope.actionUser = data.user;
    });
    $('#media-modal-' + actionId).foundation('reveal', 'open', {animation: 'fade'});
  };

  var createFailureCallback = function(data) {
    if(data.error) {
      for(var error in data.error) {
        $scope.formErrorMessages[error] = data.error[error][0];
      }
    }
  };

  var saveSuccessCallback = function(data) {
    $location.path('stands/'+data.stand.id);
  };

  var publishSuccessCallback = function(data) {
     Stand.publish(data.stand);
    $location.path('stands/'+data.stand.id);
  };

  $scope.publishStand = function() {
    if ($scope.newStand) {
      //REGEX for YOUTUBE LINKS
      if($scope.newStand.iamge_original_url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = $scope.newStand.image_original_url.match(regExp);
        if (match && match[2].length === 11) {
          $scope.newStand.image_original_url = 'http://img.youtube.com/vi/' + match[2] + '/hqdefault.jpg';
          $scope.newStand.youtube = match[2];
        }
      }
      Stand.create($scope.newStand).then(publishSuccessCallback, createFailureCallback);
    }
  };

  $scope.saveStand = function() {
    if ($scope.newStand) {
      Stand.create($scope.newStand).then(saveSuccessCallback, createFailureCallback);
    }
  };

  var clearForm = function() {
    $scope.form.$setPristine(true);
    $scope.newStand = {};
  };

  $scope.cancelStand = function() {
    $rootScope.showModal('Are you sure?', undefined, clearForm, undefined);
  };

  $scope.loadMore = function(tab) {
    $scope.showLoadMore = true;
    $scope.page += 1;

    if (tab === 'actions') {
      StandAction.list($scope.stand.id, {page: $scope.page}).then(function(data) {
        for (var i in data.standActions) {
          data.standActions[i].thumbnail =  'http://img.youtube.com/vi/' +  data.standActions[i].youtube + '/hqdefault.jpg';
          if(data.standActions[i].youtube) data.standActions[i].youtube = 'https://www.youtube.com/embed/' + data.standActions[i].youtube + '?modestbranding=1;controls=1;showinfo=0;rel=0;fs=1';
        }
        $scope.tabData[tab] = $scope.tabData[tab].concat(data.standActions);
        console.log($scope.tabData[tab]);

        if ($scope.page === 1 && $scope.tabData[tab] < 13) {
          $scope.showLoadMore = false;
        } else if ($scope.stand.actions_count ===  $scope.tabData[tab].length) {
          $scope.showLoadMore = false;
        }
        $scope.tabUrl =  $scope.createTabUrl(tab);
      });
    } else if (tab === 'updates') {
      StandUpdate.list($scope.stand.id, {page: $scope.page}).then(function(data) {
        $scope.tabData[tab] = $scope.tabData[tab].concat(data.standUpdates);

        if ($scope.page === 1 && $scope.tabData[tab] < 6) {
          $scope.showLoadMore = false;
        } else if ($scope.stand.updates_count ===  $scope.tabData[tab].length) {
          $scope.showLoadMore = false;
        }
        $scope.tabUrl = $scope.createTabUrl(tab);
      });
    }
  };
}

StandsCtrl.prototype.init = function($scope, $location) {
  // Setting mode based on the url
  $scope.mode = '';
  if (/\/stands/.test($location.path())) return $scope.mode = 'show';
  if (/\/start/.test($location.path())) return $scope.mode = 'new';
};

StandsCtrl.prototype.fetch = function($rootScope, $scope, $location, $routeParams, Stand, StandUpdate, StandAction, Profile, Category) {
  if ($scope.mode === 'show') {
    $scope.fullDetailsHtml = '';

    // Watches and locks Center-Nav-Bar when scrolling down
    var top = 1050;

    $(window).on('scroll', function () {
      if (top <= $(window).scrollTop()) {
        $('.center-nav-bar').addClass('fixed');
        $('.scroll-top-button').show().css('display','inline-block');
      } else {
        $('.center-nav-bar').removeClass('fixed');
        $('.scroll-top-button').hide();
      }
    });

    Stand.get($routeParams.standId, true).then(function(data) {
      $scope.stand = data.stand;

      if ($scope.stand.youtube) $scope.stand.youtube = 'https://www.youtube.com/embed/' + $scope.stand.youtube + '?modestbranding=1;controls=0;showinfo=0;rel=0;fs=1';

      // Calculate Days Left
      $scope.stand.days_count = (new Date() - new Date($scope.stand.closed_at)) / 86400000;
      $scope.stand.days_count = Math.round(Math.abs($scope.stand.days_count));

      if ($scope.stand.profile) $scope.fullDetailsHtml = $scope.stand.profile.full_description;

      Profile.get($scope.stand.user).then(function(data) {
        $scope.author = data.user;
        if($scope.author.bio.length > 50) $scope.author.bio = $scope.author.bio.substring(0,143) + '...';
      });
    });

    angular.element(document).ready(function () {
      var disqus_shortname = 'mystandcomments';
      /* * * DON'T EDIT BELOW THIS LINE * * */
      (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        $('#disqus_thread').append(dsq);
      })();
    });
  }

  if ($scope.mode === 'new') {
    $scope.options = {};
    $scope.options.categories = [];
    $scope.options.type = [{label: 'photo', value: 'photo'}, {label: 'video', value: 'video'}];
    $scope.options.duration = [{label: '30 days', value: 30}, {label: '60 days', value: 60}, {label: '90 days', value: 90}];
    $scope.options.goal = [{label: '100 actions', value: 100}, {label: '300 actions', value: 300}, {label: '500 actions', value: 500}, {label: '1000 actions', value: 1000}];

    $scope.newStand = {};

    Category.list().then(function(data) {
      for(var i in data.categories) {
        $scope.options.categories.push({label: data.categories[i].title, value: data.categories[i].title, id: data.categories[i].id});
      }
    });
  }
};

StandsCtrl.$inject = ['$rootScope', '$scope', '$location', '$routeParams', 'Stand', 'StandUpdate', 'StandAction', 'Profile','Category','Flag'];
myStandControllers.controller('StandsCtrl', StandsCtrl);
