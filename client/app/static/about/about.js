'use strict';

angular.module('garajApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/about', {
        templateUrl: 'app/static/about/about.html',
        controller: 'AboutCtrl'
      });
  });
