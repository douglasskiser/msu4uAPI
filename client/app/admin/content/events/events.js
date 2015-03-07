'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('events', {
        url: '/events',
        templateUrl: 'app/admin/content/events/events.html',
        controller: 'EventsCtrl',
        authenticate: true
      });
  });