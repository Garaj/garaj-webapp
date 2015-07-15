'use strict';

angular.module('garajApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/static/main/main.html',
        controller: 'MainCtrl',
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
      });
  });