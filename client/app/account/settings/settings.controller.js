'use strict';
//jshint camelcase: false
angular.module('garajApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, $http, $timeout, Notification) {

    $scope.user = Auth.getCurrentUser();
    $scope.user.skillsArray = [];

    $scope.errors = {};

    $scope.onSkillsChange = function() {
      $scope.user.skillsArray = $scope.user.skills.split(',');
      if($scope.user.skillsArray.length > 3) {
        $scope.user.skillsArray = [$scope.user.skillsArray[0], $scope.user.skillsArray[1], $scope.user.skillsArray[2]];
      }
    };

    $timeout(function() {
      $scope.onSkillsChange();
    }, 1000);

    $scope.changePhoto = function() {
      Notification.info({message: 'Changing photo...', delay: 2000});
      $http.put('/api/users/' + $scope.user._id + '/photo', { fb_username: $scope.user.fb_username }).success(function (user) {
        $scope.user.photo_url = user.photo_url;
        $scope.onSkillsChange();
        Notification.success({message: 'Saved new photo!', delay: 2000});
      }).error(function () {
        Notification.error({message: 'This profile either do not exist or not public.', delay: 3000});
      });
    };

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  });
