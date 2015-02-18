'use strict';
      function initialize() {

        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        var markers = [];
        for (var i = 0; i < locationsArray.length; i++) {
          markers[i] = new google.maps.Marker(
              {
                position: locationsArray[i].position,
                title: locationsArray[i].title,
                icon: locationsArray[i].icon,
                map: map,
              }
            );
        }

            function getUpdatedScale(zoomLevel){
              var scale; 
              if (zoomLevel < 7) {
                scale = .3;
              } 
              else if(zoomLevel < 8) {
                scale = .5;
              }              
              else if(zoomLevel < 9) {
                scale = .75;
              }
              else if(zoomLevel < 10) {
                scale = .9;
              }
              else if(zoomLevel < 11) {
                scale = 1;
              }
              else {
                scale = 1.1;
              };
              return scale;
            };

        google.maps.event.addListener(map, 'zoom_changed', function() {
            var z = map.getZoom();
            var updatedScale = getUpdatedScale(z);

            for (var i = 0; i < markers.length; i++) {
              markers[i].setIcon(
                {
                path: markers[i].getIcon().path,
                strokeColor: markers[i].getIcon().strokeColor,
                fillColor: markers[i].getIcon().fillColor,
                anchor: {
                  x: markers[i].getIcon().anchor.x,
                  y: markers[i].getIcon().anchor.y
                },
                scale: updatedScale,
                fillOpacity: 1,
              }
              );
            }
        });
      }
      google.maps.event.addDomListener(window, 'load', initialize);