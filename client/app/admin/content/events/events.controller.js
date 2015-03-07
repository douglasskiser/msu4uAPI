'use strict';

angular.module('appApp')
    .controller('EventsCtrl', function($scope, Modal, Events) {
    	$scope.events = Events.query();

    	$scope.addEvent = function() {
    		Modal.events.add(function(evt) {
                if (evt) {
                    $scope.events.unshift(evt);
                }
            });
    	};

    	$scope.removeEvent = function(evt, $index) {
    		Modal.events.delete(evt, function(wasRemoved) {
    			if (wasRemoved) {
                    $scope.events.splice($index, 1);
                }
    		});
    	};

        $scope.updateEvent = function(evt, $index) {
            Modal.events.update(evt, function(updatedEvent) {
                console.log(updatedEvent);
                console.log($index);
                $scope.events.splice($index, 1, updatedEvent);
            });
        };
    });
