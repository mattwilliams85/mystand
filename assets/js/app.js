'use strict';

var myStandApp = angular.module('myStandApp', [
  'ngRoute',
  'myStandControllers',
  'myStandServices'
]);

myStandApp.run(['$rootScope', '$location', '$timeout', 'CurrentUser',
  function ($rootScope, $location, $timeout, CurrentUser) {
    $rootScope.currentUser = {};
    $rootScope.isSignedIn = !!SignedIn;
    /*
     * Fill in User object with data if user is signed in but object is empty
    */
    $rootScope.$on('$includeContentLoaded', function(event, next, current) {
      if ($rootScope.isSignedIn) {
        CurrentUser.get().then(function(data) {
          $rootScope.currentUser = data;
        });
      }
    });

    $rootScope.goTo = '';
    $rootScope.signInRedirect = function(goTo) {
      $rootScope.goTo = goTo;
      if($rootScope.isSignedIn) {
        $location.path(goTo);
      } else {
        $('#sign-in-modal').foundation('reveal','open');
      }
    };

    $rootScope.modalText = ''
    $rootScope.modalPath = ''
    $rootScope.showModal = function(text, modalPath, okCallback, cancelCallback) {
      $rootScope.modalText = text;
      $rootScope.modalPath = modalPath
      $('#dialogue-modal').foundation('reveal', 'open');
    }

    $rootScope.closeModal = function(){
      $('#dialogue-modal').foundation('reveal', 'close');
    }

    // Prevent A-sync issue with Foundation.js
    $timeout(function() {
      $(document).foundation({
        offcanvas : {
          open_method: 'move',
          close_on_click : false
        }
      });
    }, 100);
    //
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
