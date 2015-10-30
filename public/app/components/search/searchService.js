"use strict";

tripnoutApp.factory('Search', function($http) {

	// create a new object
	var searchFactory = {};

	// get query
	searchFactory.query = function(query) {
	  return $http.get('/api/search/' + query);
	};

	// return entire userFactory object
	return searchFactory;

});