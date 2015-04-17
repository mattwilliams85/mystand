'use strict';

function StandsCtrl($rootScope, $scope, $location, $routeParams, CurrentUser, Stand, StandUpdate, StandAction, Profile, Category, Flag, UserActionableStand) {
  this.init($scope, $location);
  this.fetch($rootScope, $scope, $location, $routeParams, CurrentUser, Stand, StandUpdate, StandAction, Profile, Category, UserActionableStand);

  $scope.stand = {};
  $scope.author = {};
  $scope.tabData = {
    actions: [],
    updates: []
  };
  $scope.actionUser = {};
  $scope.newAction = {};

  $scope.tabUrl = 'assets/templates/pub/stands/details/show.html';

  $scope.formErrorMessages = {};
  $scope.page = 0;

  $scope.today = new Date();

  $scope.options = {
    categories: [],
    type: [{label: 'photo', value: 'photo'}, {label: 'video', value: 'video'}],
    duration: [{label: '30 days', value: 30}, {label: '60 days', value: 60}, {label: '90 days', value: 90}],
    goal: [{label: '100 actions', value: 100}, {label: '300 actions', value: 300}, {label: '500 actions', value: 500}, {label: '1000 actions', value: 1000}]
  };

  // Listen for updates
  $scope.listenToModel('stand', function(message) {
    console.log('received message', message.data);
    if (message.verb === 'updated') {
      $scope.stand.actions_count = message.data.actions_count;
    }
  });

  $scope.changeTab = function(section) {
    $scope.page = 0;
    $('.disqus-box').hide();

    if (section === 'details') {
      $scope.tabUrl =  $scope.createTabUrl(section);
    } else if (section === 'updates') {
      $scope.tabData.updates = [];
      $scope.loadMore('updates');
    } else if (section === 'actions') {
      $scope.tabData.actions = [];
      $scope.loadMore('actions');
    } else {
      $scope.tabUrl =  $scope.createTabUrl(section);
      $('.disqus-box').show();
    }
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
        $scope.contributor = true;
        $scope.newAction = {};
      });
    }
  };

  $scope.onSelect = function(file) {
    $scope.newAction.image_original_url = file.value
  };

  $scope.bookmarkStand = function() {
    Stand.bookmark($scope.stand);
    $('.fa-bookmark').css('color','#1EAFFC')
  };

  var flagStandSuccess = function() {
    $('.fa-flag').css('color','#8A0A18');
  }

  $scope.flagStand = function() {
    var flag = {
      user: $rootScope.currentUser.id,
      contentId: $scope.stand.id,
      contentType: 'Stand'
    };
    Flag.create(flag).then(flagStandSuccess);
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

  var standFailureCallback = function(data) {
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
    if($scope.editStand) {
      data = $scope.editStand;
    } else {
      data = data.stand
    }
    Stand.publish(data);
    $location.path('stands/'+data.id);
  };

  $scope.publishStand = function() {
    if ($scope.newStand) {
      //REGEX for YOUTUBE LINKS
      if($scope.newStand.image_original_url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = $scope.newStand.image_original_url.match(regExp);
        if (match && match[2].length === 11) {
          $scope.newStand.image_original_url = 'http://img.youtube.com/vi/' + match[2] + '/hqdefault.jpg';
          $scope.newStand.youtube = match[2];
        }
      }
      Stand.create($scope.newStand).then(publishSuccessCallback, standFailureCallback);
    } 
  };

  var updateSuccessCallback = function(data) {
    $location.path('/profile/manage')
  }

  $scope.updateStand = function() {
    if ($scope.editStand.is_public) {
      Stand.update($scope.editStand).then(updateSuccessCallback, standFailureCallback);
    }
    else {
      if($scope.editStand.image_original_url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = $scope.editStand.image_original_url.match(regExp);
        if (match && match[2].length === 11) {
          $scope.editStand.image_original_url = 'http://img.youtube.com/vi/' + match[2] + '/hqdefault.jpg';
          $scope.editStand.youtube = match[2];
        }
      }
      Stand.update($scope.editStand).then(publishSuccessCallback, standFailureCallback);
    }
  }

  $scope.saveStand = function() {
    if ($scope.newStand) {
      Stand.create($scope.newStand).then(saveSuccessCallback, standFailureCallback);
    }
    if ($scope.editStand) {
      Stand.create($scope.editStand).then(updateSuccessCallback, standFailureCallback);
    }
  };

  var clearForm = function() {
    $scope.form.$setPristine(true);
    $scope.newStand = {};
  };

  $scope.cancelStand = function() {
    $rootScope.showModal('Are you sure?', undefined, clearForm, undefined);
  };

  var closeCallback = function() {
    Stand.close($scope.editStand).then(updateSuccessCallback, standFailureCallback);
  }

  $scope.closeStand = function() {
    $scope.scrollUp();
    $rootScope.showModal('Are you sure? Closing your stand will set the end date to today.', undefined, closeCallback, undefined);
  };

  $scope.loadMore = function(tab) {
    $scope.showLoadMore = true;
    $scope.page += 1;

    if (tab === 'actions') {
      StandAction.list($scope.stand.id, {page: $scope.page}).then(function(data) {
        for (var i in data.standActions) {
          if(data.standActions[i].youtube) {
            data.standActions[i].youtube = 'https://www.youtube.com/embed/' + data.standActions[i].youtube + '?modestbranding=1;controls=1;showinfo=0;rel=0;fs=1';
            data.standActions[i].thumbnail = 'http://img.youtube.com/vi/' +  data.standActions[i].youtube + '/hqdefault.jpg';
          }
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
  if (/\/edit/.test($location.path())) return $scope.mode = 'manage';
  if (/\/stands/.test($location.path())) return $scope.mode = 'show';
  if (/\/start/.test($location.path())) return $scope.mode = 'new';
};

StandsCtrl.prototype.fetch = function($rootScope, $scope, $location, $routeParams, CurrentUser, Stand, StandUpdate, StandAction, Profile, Category, UserActionableStand) {
  
  if ($scope.mode === 'show') {
    $scope.contributor = false;
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

      if ($scope.stand.profile) $scope.fullDetailsHtml = $scope.stand.profile.full_description;
      // Calculate Remaining Days
      $scope.stand.days_count = Math.round((Math.abs(Date.now() - $scope.stand.closed_at) / 86400000));

      Profile.get($scope.stand.user).then(function(data) {
        $scope.author = data.user;
        if($scope.author.bio.length > 50) $scope.author.bio = $scope.author.bio.substring(0,143) + '...';
      });
    });

    // NEEDS UPDATE
    // CurrentUser.get().then(function(data) {
    //   $rootScope.currentUser = data;
    //   UserActionableStand.index(data.id).then(function(data){
    //     for (var i in data.stands) {
    //       if(data.stands[i].id == $scope.stand.id) $scope.contributor = true;
    //     }
    //   });
    // });

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
    $scope.newStand = {};

    Category.list().then(function(data) {
      for(var i in data.categories) {
        $scope.options.categories.push({label: data.categories[i].title, value: data.categories[i].title, id: data.categories[i].id});
      }
    });
  }

  if ($scope.mode === 'manage') {
    Category.list().then(function(data) {
      for(var i in data.categories) {
        $scope.options.categories.push({label: data.categories[i].title, value: data.categories[i].title, id: data.categories[i].id});
      }
    });
    Stand.get($routeParams.standId).then(function(data) {
      $scope.editStand = data.stand
      if(data.youtube) $scope.editStand.youtube = 'https://www.youtube.com/embed/' + data.youtube;
      for (var key in $scope.options.categories) {
        if(data.stand.category == $scope.options.categories[key].value) $scope.editStand.category = $scope.options.categories[key].id;
      }
    });
  }
};

StandsCtrl.$inject = ['$rootScope', '$scope', '$location', '$routeParams', 'CurrentUser', 'Stand', 'StandUpdate', 'StandAction', 'Profile','Category','Flag', 'UserActionableStand'];
myStandControllers.controller('StandsCtrl', StandsCtrl);
