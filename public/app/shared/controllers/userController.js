"use strict";

//user controller for the main page
//inject the User factory
tripnoutApp.controller('userController', function($scope, User){

  //set a processing variable to show loading things
  $scope.processing = true;

  //grab logged in user
  User.me().success(function(data){
    $scope.me = data;
    if(!data.pic || data.pic == "")
      $scope.img = '/static/assets/img/default_profile_small.png';
    else
      $scope.img = '/static/assets/img/profile/' + data.pic;
  })

  //grab all the users at page locationProvider
  User.all()
      .success(function(data) {

        //when all the users come back, remove the processing variable
        $scope.processing = false;

        //bind the users that come back to $scope.users
        $scope.users = data;
      });


      //function to delete a user
      $scope.deleteUser = function(id){
        $scope.processing = true;

        //accepts the user id as a paramets
        User.delete(id)
          .success(function(data) {

            //get all users to update the table
            //you can also set up your api
            //to return the list of users with the delete call
            User.all()
              .success(function(data){
                $scope.processing = false;
                $scope.users = data;
              });

          });
      }
});



