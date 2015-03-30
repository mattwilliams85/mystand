'use strict';

function StandsCtrl($scope, $location, $routeParams, Stand, StandUpdates, StandActions, Profile) {
  this.init($scope);
  this.fetch($scope, $location, $routeParams, Stand, StandUpdates, StandActions, Profile);
}

StandsCtrl.prototype.init = function($scope) {
  // Setting mode based on the url
  $scope.mode = 'show';
};

StandsCtrl.prototype.fetch = function($scope, $location, $routeParams, Stand, StandUpdates, StandActions, Profile) {
  if ($scope.mode === 'show') {
    $scope.stand = {};
    $scope.author = {};
    $scope.tabData = {};
    $scope.tabUrl = "assets/templates/stands/details/show.html"

    $scope.changeTab = function(section) {
      if(section === 'updates') {
        StandUpdates.get($routeParams.standId).then(function(data) {
          $scope.tabData = data.standUpdates;
          console.log($scope.tabData)
        });
      }
      if(section === 'actions') {
        StandActions.get($routeParams.standId).then(function(data) {
          for (var i in data.standActions) {
            data.standActions[i].thumbnail =  "http://img.youtube.com/vi/" +  data.standActions[i].youtube + "/hqdefault.jpg"
          }
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

    // $scope.loadDisqus = function() {
    //   var disqus_shortname = 'mystandcomments';
    //   /* * * DON'T EDIT BELOW THIS LINE * * */
    //   (function() {
    //       var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    //       dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    //       $('#disqus_thread').append(dsq)
         
    //   })();
    // }

    Stand.get($routeParams.standId).then(function(data) {
      data.stand.youtube = 'https://www.youtube.com/embed/' + data.stand.youtube + '?modestbranding=1;controls=0;showinfo=0;rel=0;fs=1';
      $scope.stand = data.stand;
      console.log($scope.stand)

      Profile.get(data.stand.user).then(function(data) {
        $scope.author = data.user;
        if($scope.author.bio.length > 50) $scope.author.bio = $scope.author.bio.substring(0,143) + "...";
        console.log($scope.author)
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
};

StandsCtrl.$inject = ['$scope', '$location', '$routeParams', 'Stand', 'StandUpdates', 'StandActions', 'Profile'];
myStandControllers.controller('StandsCtrl', StandsCtrl);