"use strict";

// controller applied to user creation page
tripnoutApp.controller('userCreateController', function($scope, User){

  //variable to hide/show elements of the views
  //differentiates between create or edit pages
  $scope.type = 'create';
  $scope.success = false;
  $scope.userData = {};
  //function to create a user
  $scope.saveUser = function()  {
    $scope.processing = true;

    //clear the message
    $scope.message = '';

    //use the create function in the userService
    User.create($scope.userData)
      .success(function(data) {
        $scope.processing = false;

        //clear the form
        $scope.userData = {};
        $scope.message = data.message;
        $scope.success = true;
      });

  };

});