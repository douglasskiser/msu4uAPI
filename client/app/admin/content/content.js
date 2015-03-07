'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('content', {
        url: '/content',
        templateUrl: 'app/admin/content/content.html',
        controller: 'ContentCtrl',
        authenticate: true
      });
  });