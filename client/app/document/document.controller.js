'use strict';

angular.module('app')
  .controller('DocumentCtrl', ['$scope', '$upload', function ($scope, $upload) {

    $scope.progress = 0;
    $scope.documents = [];

    $scope.load = function() {
      $.get('/api/documents', function(documents) {
        console.log(documents);
        $scope.documents = documents;
      });
    }
    $scope.load();

    $scope.$watch('files', function() {
      if (!$scope.files) {
        return;
      }
      $scope.upload = $upload.upload({
        url: '/api/documents/',
        data: {a: 'b'},
        file: $scope.files
      }).progress(function(evt) {
        console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total));
        $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
      }).success(function(data, status, headers, config) {
        $scope.documents.push(data);
        console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
      });
    });
}]);
