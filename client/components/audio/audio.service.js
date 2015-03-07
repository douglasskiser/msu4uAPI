'use strict';

angular.module('appApp')
  .factory('Audio', function ($resource) {
    return $resource('/api/audio/:id/', {
      id: '@_id'
    },
    {
      create: {
        method: 'PUT',
        params: {}
      },
      get: {
        method: 'GET',
        params: {}
      },
      remove: {
        method: 'DELETE',
        params: {}
      }
	  });
  });
