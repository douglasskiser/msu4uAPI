'use strict';

angular.module('appApp')
    .controller('AudioCtrl', function($scope, socket, Modal, Audio) {
    	$scope.audio = Audio.query();

    	$scope.addAudio = function() {
    		Modal.audio.add();
    	};

    	$scope.removeAudio = function(clip, $index) {
    		Modal.audio.delete(clip, function(wasRemoved) {
    			if (wasRemoved) {
                    $scope.audio.splice($index, 1);
                }
    		});
    	};

    	socket.socket.on('audio:update', function(clip) {
    		$scope.audio.unshift(clip);
    	});
    });
