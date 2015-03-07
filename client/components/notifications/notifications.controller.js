'use strict';

angular.module('appApp')
  .controller('NotificationsCtrl', function ($scope, Notifications) {
    $scope.notifications = Notifications.list;
  });