'use strict';

function S3UploaderService($http, $q) {
  var service = {

    /**
    * Get S3 Upload Credientials
    */
    getCredentials: function(mimetype, mode) {
      var dfr = $q.defer();

      $http({
        method: 'GET',
        url: '/uploader-config.json',
        params: {
          mimetype: mimetype,
          mode: mode
        }
      }).success(function(res) {
        dfr.resolve(res);
      }).error(function(err) {
        console.log('エラー', err);
        dfr.reject(err);
      });

      return dfr.promise;
    }

  };

  return service;
}

S3UploaderService.$inject = ['$http', '$q'];
myStandServices.factory('S3UploaderService', S3UploaderService);
