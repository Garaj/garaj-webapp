'use strict';

angular.module('garajApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/team', {
        templateUrl: 'app/static/team/team.html',
        controller: 'TeamCtrl'
      });
  });
