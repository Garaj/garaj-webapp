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
      })
      .when('/projects/the-button', {
        templateUrl: 'app/static/projects/the-button.html',
      })
      .when('/projects/diy-lego-arm', {
        templateUrl: 'app/static/projects/diy-lego-arm.html',
      });
  });
