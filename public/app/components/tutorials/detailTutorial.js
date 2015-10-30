tripnoutApp.controller('detailTutorial', function($rootScope, $scope, $location, $stateParams, Auth, Trip, Tutorial, User) {

	  //get info if a person is logged in

    $scope.loggedIn = Auth.isLoggedIn();

  	Auth.getUser()
    .success(function(data) {

      $scope.userTrips = data.trips;

    });
    
    Tutorial.get($stateParams.tutorial_id)
    .success(function(data) {
      $scope.tutorialdata = data;
      console.log($scope.tutorialdata);
    });


});