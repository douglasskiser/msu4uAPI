'use strict';

angular.module('appApp')
    .controller('AccountCtrl', function($scope, Modal, Auth, Notifications) {
        $scope.user = angular.extend({}, Auth.getCurrentUser());

        $scope.updateAccount = function(form) {
            if (form.$valid) {
                Auth.updateAccount($scope.user.name, $scope.user.email)
                    .then(function(user) {
                        Notifications.add({
                            type: 'success',
                            message: 'Your account has been updated.'
                        });
                        $scope.user = user;
                    })
                    .catch(function() {
                        Notifications.add({
                            type: 'danger',
                            message: 'There was an error updating your account.'
                        });
                    });
            }
        };

        $scope.changePassword = function(form) {
            if (form.$valid) {
                if ($scope.user.newPassword.length < 5) {
                    $scope.errors = 'Password is too short.';
                } else if ($scope.user.newPassword !== $scope.user.confirm) {
                    $scope.errors = 'Confirmation does not match password.';
                } else {
                    Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
                        .then(function() {
                            Notifications.add({
                                type: 'success',
                                message: 'Your password has been changed.'
                            });
                            $scope.user.oldPassword = '';
                            $scope.user.newPassword = '';
                            $scope.user.confirm = '';
                        })
                        .catch(function() {
                            Notifications.add({
                                type: 'danger',
                                message: 'There was an error changing your password.'
                            });
                        });
                }
            }
        };
    });
