'use strict';

angular.module('garajApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/contact', {
        templateUrl: 'app/static/contact/contact.html',
        controller: 'ContactCtrl'
      });
  });
