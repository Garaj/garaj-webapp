'use strict';

angular.module('garajApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/events', {
        templateUrl: 'app/static/events/events.html',
        controller: 'EventsCtrl'
      })
      .when('/events/garaj-talks', {
        templateUrl: 'app/static/events/garaj-talks.html'
      })
      .when('/events/coderdojo', {
        templateUrl: 'app/static/events/coderdojo.html'
      });
  });
