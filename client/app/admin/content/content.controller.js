'use strict';

angular.module('appApp')
    .controller('ContentCtrl', function($scope) {
        $scope.test = 'd';
        
        /**
        $scope.onFileSelect = function(files) {

            var uploadFile = function(fileIndex) {

            	
                return $upload.upload({
                        method: 'POST',
                        url: '/api/upload',
                        data: {
                            filePath: files[fileIndex].name
                        },
                        file: files[fileIndex]
                    })
                    .then(function() {
                        if (files.length > fileIndex + 1) {
                            return uploadFile(fileIndex + 1);
                        } else {
                            return true;
                        }
                    })
                    .catch(function(error) {
                        console.log('Error Uploading File: ', error);
                    });
            };

            uploadFile(0)
                .then(function() {
                	$scope.files = [];
                    console.log('All Files Uploaded');
                });
        };
        **/
    });
