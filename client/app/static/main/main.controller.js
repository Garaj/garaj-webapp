'use strict';

angular.module('garajApp')
  .controller('MainCtrl', function ($scope, posts) {
    $scope.posts = posts;
  });
