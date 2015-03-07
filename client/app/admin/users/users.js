'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('users', {
        url: '/users',
        templateUrl: 'app/admin/users/users.html',
        controller: 'UsersCtrl',
        authenticate: true
      });
  });