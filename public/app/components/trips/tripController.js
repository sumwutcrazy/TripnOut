tripnoutApp.controller('tripController', function($rootScope, $scope, $location, $stateParams, Auth, Trip) {

	  //get info if a person is logged in
  	$scope.loggedIn = Auth.isLoggedIn();

  	Trip.get($stateParams.trip_id)
    .success(function(data) {

      console.log(data);
      $scope.trip = data;

    });

});