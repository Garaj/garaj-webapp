'use strict';

angular.module('garajApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
    {
      'title': 'About',
      'link': '/about'
    },
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
    }

    ];

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
  });