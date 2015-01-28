'use strict';

angular.module('app')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/document', {
        templateUrl: 'app/document/document.html',
        controller: 'DocumentCtrl'
      });
  });
