'use strict';

angular.module('appApp')
    .controller('UsersCtrl', function($scope, Modal, Auth, User) {

        // Use the User $resource to fetch all users
        $scope.users = User.query();

        $scope.delete = function(user) {
            Modal.users.delete(user, function() {
                angular.forEach($scope.users, function(u, i) {
                    if (u === user) {
                        $scope.users.splice(i, 1);
                    }
                });
            });
        };

        $scope.addUser = function() {
            Modal.users.add(function(user) {
                if (user) {
                    $scope.users.push(user);
                }
            });
        };
    });
