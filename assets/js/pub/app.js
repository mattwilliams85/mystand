'use strict';

var myStandApp = angular.module('myStandApp', [
  'ngRoute',
  'myStandControllers',
  'myStandServices',
  'textAngular',
  'ngSails'
]);

myStandApp.run(['$rootScope', '$location', '$timeout', '$sails', 'CurrentUser',
  function ($rootScope, $location, $timeout, $sails, CurrentUser) {
    $rootScope.currentUser = {};
    $rootScope.isSignedIn = !!SignedIn;
    $rootScope.formValues = {};
    /*
     * Fill in User object with data if user is signed in but object is empty
    */
    $rootScope.$on('$includeContentLoaded', function() {
      if ($rootScope.isSignedIn) {
        CurrentUser.get().then(function(data) {
          $rootScope.currentUser = data;
        });
      }
    });

    $rootScope.redirectUnlessSignedIn = function() {
      if (!$rootScope.isSignedIn) {
        window.location = '/';
      }
    };

    $rootScope.goTo = '';
    $rootScope.signInRedirect = function(goTo) {
      $rootScope.goTo = goTo;
      if($rootScope.isSignedIn) {
        $location.path(goTo);
      } else {
        $('#sign-in-modal').foundation('reveal','open');
      }
    };

    $rootScope.modalText = '';
    $rootScope.modalPath = '';
    $rootScope.showModal = function(text, modalPath, okCallback, cancelCallback) {
      $rootScope.modalText = text;
      $rootScope.modalPath = modalPath;
      $rootScope.okCallback = okCallback;
      $rootScope.cancelCallback = cancelCallback;
      $('#dialogue-modal').foundation('reveal', 'open');
    };

    $rootScope.closeModal = function(){
      $('#dialogue-modal').foundation('reveal', 'close');
    };

    $rootScope.readyHeader = function() {
      $(document).foundation();
    };

    $rootScope.listenToModel = function(modelName, cb) {
      $sails._raw.removeEventListener(modelName);
      $sails.on(modelName, cb);
    };

    //CENTER-NAV-BAR Functions
    $rootScope.tabUrl = '';

    $rootScope.createTabUrl = function(section) {
      return "assets/templates/pub/stands/" + section + "/show.html";
    };

    $rootScope.isActiveTab = function(section) {
      return $rootScope.createTabUrl(section) === $rootScope.tabUrl;
    };

    $rootScope.scrollUp = function() {
      $("body").animate({scrollTop: 0}, "slow");
    };


    // Prevent A-sync issue with Foundation.js
    $timeout(function() {
      $(document).foundation({
        offcanvas : {
          open_method: 'move',
          close_on_click : false
        }
      });
    }, 100);
  }
]);

var myStandControllers = angular.module('myStandControllers', []);

var myStandServices = angular.module('myStandServices', ['ngResource']);

myStandApp.config(
  ['$sceProvider', '$httpProvider', function($sceProvider, $httpProvider) {
    $sceProvider.enabled(false);
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-Token';
  }]
);

myStandApp.config(['$provide', function($provide) {
  $provide.decorator('$templateCache', ['$delegate', '$sniffer', function ($delegate, $sniffer) {
    var originalGet = $delegate.get;

    $delegate.get = function(key) {
      var value;
      value = originalGet(key);
      if (!value) {
        // JST is where my partials and other templates are stored
        // If not already found in the cache, look there...
        value = JST[key]();
        if (value) {
          $delegate.put(key, value);
        }
      }
      return value;
    };

    return $delegate;
  }]);

  return this;
}]);
