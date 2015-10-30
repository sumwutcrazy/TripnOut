// https://scotch.io/tutorials/angularjs-best-practices-directory-structure

"use strict";

var tripnoutApp = angular.module('tripnoutApp', ['ui.router', 'ngAnimate', 'ngMaterial', 'flow'])

.config(function($mdThemingProvider, flowFactoryProvider) {

    $mdThemingProvider.theme('default')
        .primaryPalette('deep-orange')
        .accentPalette('green');  

    //var validToken = ;

    // http://ngmodules.org/modules/ng-flow
    flowFactoryProvider.defaults = {
      target: '/api/upload',
      //query: { 'x-access-token': validToken },
      singleFile: true,
      attributes: { accept: 'image/*' },
      permanentErrors: [404, 500, 501],
      maxChunkRetries: 1,
      chunkRetryInterval: 5000,
      simultaneousUploads: 1
    };

    flowFactoryProvider.on('catchAll', function (event) {
      console.log('catchAll', arguments);
    });

})

.run(['$rootScope', 'Auth',function($rootScope, Auth){
	
	  //check to see if a user is logged in on every request
    $rootScope.$on('$routeChangeStart', function() {
      $scope.loggedIn = Auth.isLoggedIn();

      //get user information on route change
      Auth.getUser()
        .success(function(data) {
          $scope.user = data;
        });
    });

}]);