'use strict';

angular.module('appApp')
    .controller('AdminCtrl', function($scope, $location, Auth) {
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.logout = function() {
            Auth.logout();
            $location.path('/');
        };
    });
