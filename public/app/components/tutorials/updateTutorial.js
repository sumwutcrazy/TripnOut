tripnoutApp.controller('updateTutorial', function($rootScope, $scope, $state, $location, $stateParams, Auth, Tutorial) {

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
    
    var prepStepCount = 1;
    var keyItemCount = 1;
    var phraseCount = 1;
    var clothingCount = 1;
    var placesCount = 1;
    
    $scope.tutorial = {};
    $scope.tutorial.choice = 'No';
    $scope.tutorial.prepSteps = false;
    $scope.tutorial.keyItems = false;
    $scope.tutorial.phrases = false;
    $scope.tutorial.cost = false;
    $scope.tutorial.temperature = false;
    $scope.tutorial.clothing = false;
    $scope.tutorial.keyPlaces = false;
    
    
    $scope.resetTripLink = function(){
        console.log("1st: " + $scope.tutorialdata.trip_link);
        if($scope.tutorial.choice == 'No'){
            $scope.tutorialdata.trip_link = null;
            console.log("2nd: " + $scope.tutorialdata.trip_link);
        }
    }
    
    $scope.addNewData = function(titleData, typeData, index){
        console.log(index);
        
         switch(typeData){
            case 'prepSteps':
                $scope.tutorial.prepSteps = true;
                var stepNum = titleData + " " + (prepStepCount);
                prepStepCount++;
                break;
            case 'keyItems':
                $scope.tutorial.keyItems = true;
                var stepNum = titleData + " " + (keyItemCount);
                keyItemCount++;
                break;
            case 'phrases':
                $scope.tutorial.phrases = true;
                var stepNum = titleData + " " + (phraseCount);
                phraseCount++;
                break;
            case 'clothing':
                $scope.tutorial.clothing = true;
                var stepNum = titleData + " " + (clothingCount);
                
                clothingCount++;
                break;
            case 'keyPlaces':
                $scope.tutorial.keyPlaces = true;
                var stepNum = titleData + " " + (placesCount);
                placesCount++;
                break;    
            
        }
        
        var newData = {
            title: stepNum,
            input: ''
        
            }
        
        var item = $scope.tutorialdata.content[index];
        item.data.push(newData);
    }
    
    
    
    $scope.addCompartment = function(typeData, titleData){
        
        switch(typeData){
            case 'prepSteps':
                $scope.tutorial.prepSteps = true;
                var stepNum = titleData + " " + (prepStepCount);
                var nameData = "Preparation Steps"; 
                prepStepCount++;
                break;
            case 'keyItems':
                $scope.tutorial.keyItems = true;
                var stepNum = titleData + " " + (keyItemCount);
                var nameData = "Key Items" ;
                keyItemCount++;
                break;
            case 'phrases':
                $scope.tutorial.phrases = true;
                var stepNum = titleData + " " + (phraseCount);
                var nameData = "Common Phrases" ;
                phraseCount++;
                break;
            case 'cost':
                $scope.tutorial.cost = true;
                var stepNum = titleData;
                var nameData = "Average Cost"; 
                break;
             case 'temperature':
                $scope.tutorial.temperature = true;
                var stepNum = titleData;
                var nameData = "Average Temperature"; 
                break;
            case 'clothing':
                $scope.tutorial.clothing = true;
                var stepNum = titleData + " " + (clothingCount);
                var nameData = "Suggested Clothing"; 
                clothingCount++;
                break;
            case 'keyPlaces':
                $scope.tutorial.keyPlaces = true;
                var stepNum = titleData + " " + (placesCount);
                var nameData = "Key Places to Visit"; 
                placesCount++;
                break;    
            
        }
        
        
        
      var newContent = {
        type: typeData,
        name: nameData,
        data: [{
            title: stepNum,
            input: ''
            }
        ] 
      };
          
    $scope.tutorialdata.content.push(newContent);
    }
    
    $scope.removeSection = function(typeData, index){
        console.log(index);
      if(index > -1){
        $scope.tutorialdata.content.splice(index, 1);
      }
        
    switch(typeData){
            case 'prepSteps':
                $scope.tutorial.prepSteps = false;
                prepStepCount = 1;
                break;
            case 'keyItems':
                $scope.tutorial.keyItems = false;
                keyItemCount = 1;
                break;
            case 'phrases':
                $scope.tutorial.phrases = false;
                phraseCount = 1;
                break;
            case 'cost':
                $scope.tutorial.cost = false;
                break;
             case 'temperature':
                $scope.tutorial.temperature = false;
                break;
            case 'clothing':
                $scope.tutorial.clothing = false;
                clothingCount = 1;
                break;
            case 'keyPlaces':
                $scope.tutorial.keyPlaces = false;
                placesCount = 1;
                break;    
            
        }   

    };
    
    $scope.updateTutorial = function(){

    	Tutorial.update($stateParams.tutorial_id, $scope.tutorialdata)
    	.success(function(response){
    		$state.go('myTutorials');
    	});

    };
    
    

});