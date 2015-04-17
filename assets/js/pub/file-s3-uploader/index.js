'use strict';

angular.module('myStandApp.fileS3Uploader', [])
.directive('fileS3Uploader', function() {
  return {
    restrict: 'AE',
    scope: {
      data: '=',
      mode: '@',
      autoUpload: '@',
      showProgress: '@'
    },
    template: JST['assets/templates/pub/file-s3-uploader/index.html'],
    controller: 'FileS3UploaderCtrl'
  };
});
