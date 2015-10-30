"use strict";

//controller applied to user edit page
tripnoutApp.controller('editProfileController', function($timeout, $scope, $state, User) {

  //variable to hide/show elements of the view
  //differentiates between create or edit pages
  $scope.type = 'edit';
  $scope.process = false;


  $scope.pwBool = false;
  $scope.newPw = { pw: "", pw2: ""};
  $scope.changePw = function(){
    if($scope.pwBool){
      $scope.pwBool = false;
      $scope.newPw = { pw: "", pw2: ""};
    }
    else
      $scope.pwBool = true;
  };
  //get the user data for the user you want to edit
  //$routeParams is the waywe grab data from the url

  $scope.imgBool = false;
  $scope.imgConfirm = 'Cancel';
  $scope.changeImg = function() {
    if ($scope.imgBool){
      $scope.imgBool = false;
      $scope.imgConfirm = 'Cancel';
    }
    else {
      $scope.imgBool = true;
    }
  }

  
  User.me().success(function(data){
    $scope.me = data;
    if (!data.pic || data.pic == ""){
      $scope.img = '/static/assets/img/default_profile_small.png';
    } else {
      $scope.img = '/static/assets/img/profile/' + data.pic;
    }
  })

  User.me()
    .success(function(data) {
      $scope.processing = false;

      //clear the form
      $scope.userData = data;
    });

    // on new photo upload, update database and upload image
  $scope.onUpload = function($flow) {
    $scope.me.pic = $flow.files[0].name;
    $scope.img = '/static/assets/img/profile/' + $scope.me.pic;
    $scope.userData.pic = $flow.files[0].name;
    $scope.saveUser();
    $flow.upload();
    $scope.imgConfirm = "OK";
  }

  $scope.saveUser = function()  {
    $scope.processing = true;
    //clear the message
    $scope.message = '';

    if($scope.pwBool){
      if($scope.newPw.pw == $scope.newPw.pw2 && $scope.newPw.pw != "")
      {
        $scope.userData.password = $scope.newPw.pw2;

        User.update($scope.userData._id, $scope.userData)
          .success(function(data) {
            $scope.processing = false;

            $scope.success = true;
            $scope.message = data.message;
            $timeout(function(){$scope.success = false}, 3000);
            $scope.me.name = $scope.userData.name;
            $scope.newPw = { pw: "", pw2: ""};
            $scope.pwBool = false;
          });
      }
      else if($scope.newPw.pw != $scope.newPw.pw2)
      {
        $scope.processing = false;
        $scope.message = "Passwords do not match";
        $scope.success = true;
        $timeout(function(){$scope.success = false}, 3000);

        return;
      }
      else if($scope.newPw.pw == "")
      {
        $scope.processing = false;
        $scope.message = "Password field is empty!";
        $scope.success = true;
        $timeout(function(){$scope.success = false}, 3000);

        return;
      }
    }

    //use the create function in the userService
    User.update($scope.userData._id, $scope.userData)
      .success(function(data) {
        $scope.processing = false;

        $scope.success = true;
        $scope.message = data.message;
        $timeout(function(){$scope.success = false}, 3000);
        $scope.me.name = $scope.userData.name;
      });

  };

});