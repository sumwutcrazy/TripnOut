tripnoutApp.controller('myTutorials', function($rootScope, $scope, $location, $state, $stateParams, $mdToast, $animate, Auth, Trip, Tutorial) {

	  //get info if a person is logged in

    $scope.loggedIn = Auth.isLoggedIn();


    Auth.getUser()
    .success(function(data) {
      console.log(data);
      $scope.myData = data;
    });
    
});