'use strict';
var menu = [
  {
    'title': 'People',
    'link': '/people'
  },
  {
    'title': 'Projects',
    'link': '/projects'
  },
  {
    'title': 'Events',
    'link': '/events'
  },
  {
    'title': 'Blog',
    'link': '/blog'
  },
  {
    'title': 'Contact',
    'link': '/contact'
  },
  {
    'title': 'Sponsors',
    'link': '/sponsors'
  },
  {
    'icon' : 'facebook',
    'target' : '_blank',
    'link': 'https://www.facebook.com/groups/garajco/'
  },
  {
    'icon' : 'twitter',
    'target' : '_blank',
    'link': 'https://www.twitter.com/garajco/'
  }];

angular.module('garajApp')
  .controller('NavbarCtrl', function ($scope, $rootScope, $location, $http, Auth) {
    $scope.state = $rootScope.lastState;
    $scope.menu = menu;

    $http.get('http://api.garaj.co/spaceapi').success(function(data) {
      $scope.state = $rootScope.lastState = data.state;
      $scope.state.lastChangeDate = new Date(data.state.lastchange * 1000);
    });

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  })
  .controller('FooterCtrl', function ($scope, $location, $http, Auth) {
    $scope.menu = menu;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
