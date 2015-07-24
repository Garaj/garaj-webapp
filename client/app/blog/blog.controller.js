'use strict';

angular.module('garajApp')
  .controller('BlogCtrl', function ($scope, Auth, posts, $http, Notification) {
    $scope.isAdmin = Auth.isAdmin;
    $scope.posts = posts;
    var swal = window.swal;

    $scope.deletePost = function (postId) {
      swal({
        title: 'Are you sure to delete this post?',
        text: 'You will not be able to recover it!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, delete it!',
        closeOnConfirm: true
      }, function() {
        Notification.info('Deleting post...');
        $http.delete('api/posts/' + postId).success(function () {
          Notification.success('The post has been deleted.');
          angular.element('.blog-post-' + postId).hide();
        }).error(function () {
          Notification.info('Could not delete post!');
        });
    });
   };
  })
  .controller('BlogNewPostCtrl', function ($scope, Auth, $http, $location, Notification, $routeParams) {

    if($routeParams.postid) {
      $http.get('/api/posts/' + $routeParams.postid).success(function (data) {
        $scope.post = data;
        angular.element('.editable').html(data.content);
      }).error(function () {
        Notification.error('could not fetch post!');
        $scope.post = {};
      });
    }

    var MediumEditor = window.MediumEditor;

    var editor = new MediumEditor('.editable', {
      placeholder: {
        text: ''
      },
      toolbar: {
        buttons: ['anchor', 'bold', 'italic', 'unorderedlist', 'anchor', 'h2', 'h3', 'quote'],
      }
    });

    $scope.onTagsChange = function () {
      if($scope.post.tagsString.indexOf(',') > -1) {
        $scope.post.tags = $scope.post.tagsString.split(',');
      }
    };

    $scope.save = function () {
      $scope.post.content = angular.element('.editable').html();
      if($scope.post._id) {
        $http.patch('/api/posts/' + $scope.post._id, $scope.post).success(function () {
          Notification.success({ message: 'Post updated', delay: 3000});
          $location.url('/blog');
        }).error(function () {
          Notification.error({ message: 'Could not edit post', delay: 3000});
        });
      } else {
        $http.post('/api/posts', $scope.post).success(function () {
          Notification.success({ message: 'Post added to blog', delay: 3000});
          $location.url('/blog');
        }).error(function () {
          Notification.error({ message: 'Could not add post', delay: 3000});
        });
      }
    };
  });
