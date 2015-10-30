tripnoutApp.controller('deleteController', function($rootScope, $scope, $location, $state, $stateParams, Auth, Trip, Tutorial, User) {

$scope.tutorial_id = $stateParams.tutorial_id;

    console.log($scope.tutorial_id);
    
     $scope.deleteTutorial = function(){
        Tutorial.delete($scope.tutorial_id)
            .success(function(response){
                console.log("Successful");
                $state.go('myTutorials');
              });
    }
        
    
    
});