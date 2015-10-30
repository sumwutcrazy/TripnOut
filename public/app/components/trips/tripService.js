"use strict";

tripnoutApp.factory('Trip', function($http) {

	// create a new object
	var tripFactory = {};

	// get latest public trips (w/ infinite scroll)
	tripFactory.latest = function(limit, offset) {
	  return $http.get('/api/trips/latest/' + limit +'/' + offset);
	};

	// get a single trip
	tripFactory.get = function(id) {
	  return $http.get('/api/trips/' + id);
	};

	// get a single trip (without addition info)
	tripFactory.getTrip = function(id) {
	  return $http.get('/api/trip/' + id);
	};

	// get all trips
	tripFactory.all = function() {
	  return $http.get('/api/trips/');
	};

	// create a user
	tripFactory.create = function(tripData) {
	  return $http.post('/api/trips/', tripData);
	};

	// update a user
	tripFactory.update = function(trip_id, user_id, tripData) {
	  return $http.put('/api/trips/' + trip_id + '/' + user_id, tripData);
	};

	// delete a user
	tripFactory.delete = function(trip_id, user_id) {
	  return $http.delete('/api/trips/' + trip_id + '/' + user_id);
	};

	// return entire userFactory object
	return tripFactory;

});