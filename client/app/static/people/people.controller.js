'use strict';

angular.module('garajApp')
  .controller('PeopleCtrl', function ($scope, people) {
    $scope.people = people;
  });
