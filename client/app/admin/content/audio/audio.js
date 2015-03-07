'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('audio', {
        url: '/audio',
        templateUrl: 'app/admin/content/audio/audio.html',
        controller: 'AudioCtrl',
        authenticate: true
      });
  });