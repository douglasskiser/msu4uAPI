'use strict';

angular.module('appApp')
  .factory('Events', function ($resource) {
    return $resource('/api/events/:id/', {
      id: '@_id'
    },
    {
      get: {
        method: 'GET',
        params: {}
      },
      remove: {
        method: 'DELETE',
        params: {}
      },
      update: {
        method: 'PUT',
        params: {}
      }
	  });
  });
