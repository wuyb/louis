'use strict';

angular.module('app')
  .controller('DocumentCtrl', ['$scope', '$upload', function ($scope, $upload) {

    $scope.$watch('files', function() {
      console.log($scope.files);
      $scope.upload = $upload.upload({
        url: '/api/documents/',
        data: {a: 'b'},
        file: $scope.files
      }).progress(function(evt) {
        console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
      });
    });
}]);
