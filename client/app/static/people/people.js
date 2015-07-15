'use strict';

angular.module('garajApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/people', {
        templateUrl: 'app/static/people/people.html',
        controller: 'PeopleCtrl',
        resolve: {
          people: function ($q, $http) {
            var deferred = $q.defer();

            $http.get('/api/users/').success(function(data) {
              _.each(data, function (item) {
                item.skillsArray = item.skills.split(',');
              });

              deferred.resolve(data);
            }).error(function(){
              deferred.reject('Error');
            });

            return deferred.promise;
          }
        }
      });
  });
