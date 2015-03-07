'use strict';

angular.module('appApp')
    .directive('fileInput', function($rootScope, socket, Notifications) {
        return {
            replace: true,
            restrict: 'AE',
            templateUrl: 'components/file-input/file-input.html',
            link: function(scope) {
                var ss = window.ss;
                var browseInput = document.getElementById('browse-input');
                var file;

                scope.clientFile = {
                    selected: false,
                    progress: '',
                    name: ''
                };

                scope.browseFile = function() {
                    scope.clientFile.progress = '';

                    browseInput.click();
                };

                scope.upload = function() {
                    var stream = ss.createStream();
                    var size = 0;

                    ss(socket.socket).emit('upload', stream, {
                        size: file.size,
                        name: file.name.toString()
                    });
                    var blob = ss.createBlobReadStream(file);

                    // handle progress
                    blob.on('data', function(chunk) {
                        size += chunk.length;
                        scope.clientFile.progress = Math.floor(size / file.size * 100) + '%';

                        if (scope.clientFile.progress === '100%') {
                            scope.clientFile.progress = 'Finished';
                        }

                        //console.log(Math.floor(size / file.size * 100) + '%');
                    });

                    blob.pipe(stream);
                };

                angular.element(browseInput)
                    .on('change', function(e) {
                        file = e.target.files[0];
                        scope.$apply(function() {
                            scope.clientFile.name = file.name;
                            scope.clientFile.selected = true;
                        });   
                    });

                socket.socket.on('upload:done', function() {
                    Notifications.add({
                        type: 'success',
                        message: 'Your file has been uploaded.'
                    });
                });
            }
        };
    });
