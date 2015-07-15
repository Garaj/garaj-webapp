'use strict';

angular.module('garajApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/projects', {
        templateUrl: 'app/static/projects/projects.html',
        controller: 'ProjectsCtrl'
      })
      .when('/projects/smart-lock', {
        templateUrl: 'app/static/projects/smart-lock.html',
      });
  });
