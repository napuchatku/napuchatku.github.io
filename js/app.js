'use strict';
      function initialize() {

        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        var infowindow = new google.maps.InfoWindow();

        var markers = [];

        function setMarker(i) {
          markers[i] = new google.maps.Marker(
            {
              position: locationsArray[i].position,
              title: locationsArray[i].title,
              icon: locationsArray[i].icon,
              map: map,
            }
          );
        }

        function formatDate(dateObject) {
          var formattedDate = '';
          formattedDate += dateObject.from.getDate();
          formattedDate += '/';
          formattedDate += dateObject.from.getMonth();
          formattedDate += '/';
          formattedDate += dateObject.from.getFullYear();
          formattedDate += ' - ';
          formattedDate += dateObject.to.getDate();
          formattedDate += '/';
          formattedDate += dateObject.to.getMonth();
          formattedDate += '/';
          formattedDate += dateObject.to.getFullYear();
          return formattedDate;
        }

        function attachInfoWindow(i) {
          var content = '<h1>' + markers[i].title + '</h1>';
          if(locationsArray[i].dates) {
            content += '<hr>';
            content += '<ol>';
            for (var k = 0; k < locationsArray[i].dates.length; k++) {
              content += '<li>' + formatDate(locationsArray[i].dates[k]) + '</li>';
            }
            content += '</ol>';
          }
          google.maps.event.addListener(markers[i], 'click', function() {
            infowindow.setContent(content);
            infowindow.open(map, markers[i]);
          });
        }

        for (var i = 0; i < locationsArray.length; i++) {
          setMarker(i);
          attachInfoWindow(i);
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