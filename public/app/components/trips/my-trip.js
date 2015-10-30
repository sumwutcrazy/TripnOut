"use strict";

tripnoutApp.directive('myTrip', function(){
  return {
    restrict: 'E',
    scope: {
      details: '='
    },
    templateUrl: 'static/app/components/trips/my-trip.html'
  };
});