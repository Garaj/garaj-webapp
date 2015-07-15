'use strict';

angular.module('garajApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/blog', {
        templateUrl: 'app/blog/blog.html',
        controller: 'BlogCtrl',
        resolve: {
          posts: function ($q, $http) {
            var deferred = $q.defer();

            $http.get('/api/posts/').success(function(data) {
              deferred.resolve(data);
            }).error(function(){
              deferred.reject('Error');
            });

            return deferred.promise;
          }
        }
      })
      .when('/blog/new-post', {
        templateUrl: 'app/blog/new.html',
        controller: 'BlogNewPostCtrl'
      })
      .when('/blog/edit/:postid', {
        templateUrl: 'app/blog/new.html',
        controller: 'BlogNewPostCtrl'
      });
  });
