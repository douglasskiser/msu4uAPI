'use strict';

angular.module('appApp')
	.service('Notifications', function() {
		this.list = [];

		this.add = function(notification) {
			return this.list.push(notification);
		};
	});