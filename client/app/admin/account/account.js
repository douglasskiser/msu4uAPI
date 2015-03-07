'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('account', {
        url: '/account',
        templateUrl: 'app/admin/account/account.html',
        controller: 'AccountCtrl',
        authenticate: true
      });
  });