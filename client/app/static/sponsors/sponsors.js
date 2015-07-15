'use strict';

angular.module('garajApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/sponsors', {
        templateUrl: 'app/static/sponsors/sponsors.html',
        controller: 'SponsorsCtrl'
      });
  });
