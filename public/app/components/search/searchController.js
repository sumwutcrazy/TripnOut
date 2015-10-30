"use strict";
// http://ngmodules.org/modules/ng-flow
tripnoutApp.controller('searchController', function($scope, $state, $stateParams, Search) {
  	
    $scope.mySearch = $stateParams.query;

    if($stateParams.query){
      Search.query($scope.mySearch)
        .success(function(response){
        	console.log(response);
            $scope.results = response;
        });
    }

    $scope.goSearch = function(qu, isValid){

        $scope.submitted = true;
        $scope.mySearch = qu;

        if(isValid){
            Search.query(qu)
	        .success(function(response){
	        	console.log(response);
	            $scope.results = response;
	        });
        }

    };

});