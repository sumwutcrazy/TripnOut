tripnoutApp.directive('vectorMap', function() {
  return {
    restrict: 'EA',
    scope: true,
    link: function (scope, element, attr) {

      var map = AmCharts.makeChart( element[0].id, {

        "type": "map",
        "theme": "dark",
        "pathToImages": "/static/assets/img/map/",
        "dataProvider": {
          "map": "worldLow",
          "getAreasFromMap": true
        },
        "areasSettings": {
          "autoZoom": false,
          "selectable": true,
          "color": "#000",
          "outlineColor": "#FFF",
          "outlineThickness": .7,
          "rollOverColor": "#555",
          "selectedColor": "#333"
        },
        "zoomControl": {
          "zoomControlEnabled": true,
          "buttonFillColor": "#333",
          "buttonRollOverColor": "#555",
          "gridColor": "#000",
          "left": 40
        },
        "export": {
          "enabled": true,
          "position": "bottom-right"
        }
      });

      function handleMapObjectClick( event ) {
          scope.goSearch(event.mapObject.enTitle, true);
      }

      map.addListener( "clickMapObject", handleMapObjectClick );

    }

  };
});