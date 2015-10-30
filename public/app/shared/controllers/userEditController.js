"use strict";

//controller applied to user edit page
tripnoutApp.controller('userEditController', function($scope, $stateParams, User) {

  //variable to hide/show elements of the view
  //differentiates between create or edit pages
  $scope.type = 'edit';

  //get the user data for the user you want to edit
  //$routeParams is the waywe grab data from the url
  User.get($stateParams.user_id)
    .success(function(data) {
      $scope.processing = false;

      console.log(data);

      //clear the form
      $scope.userData = {};

      //bind the message from our API to $scope.message
      $scope.message = data.message;
    });

});