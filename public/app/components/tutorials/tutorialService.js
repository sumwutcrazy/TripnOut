"use strict";

tripnoutApp.factory('Tutorial', function($http) {

	// create a new object
	var tutorialFactory = {};

    // get all tutorials
	tutorialFactory.all = function() {
	  return $http.get('/api/tutorials/');
	};

	// get a single tutorial
	tutorialFactory.get = function(id) {
	  return $http.get('/api/tutorials/' + id);
	};

	// create a user
	tutorialFactory.create = function(tutorialData) {
	  return $http.post('/api/tutorials/', tutorialData);
	};

	// update a user
	tutorialFactory.update = function(tutorial_id, tutorialData) {
	  return $http.put('/api/tutorials/' + tutorial_id, tutorialData);
	};

	// delete a user
	tutorialFactory.delete = function(tutorial_id) {
	  return $http.delete('/api/tutorials/' + tutorial_id); 
	};

	// return entire userFactory object
	return tutorialFactory;

});
