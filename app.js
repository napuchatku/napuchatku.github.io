'use strict';
      function initialize() {
        var styleArray = [
          {
            featureType: "road",
            stylers: [
              { visibility: "off" }
            ]
          }
        ];

        var icon1 = {
          path: 'M32.333,0C14.462,0,0,14.519,0,32.39c0,20.343,14.711,27.647,20.052,35.519S31.39,84.438,32.333,100  c0.944-15.518,6.19-23.074,11.995-32.092c5.806-9.018,20.395-17.648,20.395-35.519S50.203,0,32.333,0z M32.361,26.114  c3.201,0,5.797,2.595,5.797,5.796s-2.596,5.796-5.797,5.796s-5.796-2.595-5.796-5.796S29.16,26.114,32.361,26.114z',
          strokeColor: '#031634',
          fillColor: '#031634',
          fillOpacity: 1,
          scale: .3,
          anchor: {x: 33.33333, y:105}
        };

        var icon2 = {
          path: 'M32.333,0C14.462,0,0,14.519,0,32.39c0,20.343,14.711,27.647,20.052,35.519S31.39,84.438,32.333,100  c0.944-15.518,6.19-23.074,11.995-32.092c5.806-9.018,20.395-17.648,20.395-35.519S50.203,0,32.333,0z M32.361,26.114  c3.201,0,5.797,2.595,5.797,5.796s-2.596,5.796-5.797,5.796s-5.796-2.595-5.796-5.796S29.16,26.114,32.361,26.114z',
          strokeColor: '#2272f2',
          fillColor: '#2272f2',
          fillOpacity: 1,
          scale: .3,
          anchor: {x: 33.33333, y:105}
        };

        var locationsArray = [
          {
            position: { lat: 52.239876, lng: 21.018622}, 
            title:"Warszawa",
            icon: icon1
          },
          {
            position: { lat: 52.167279, lng: 22.299210},
            title:"Siedlce",
            icon: icon1
          },
          {
            position: { lat: 51.247131, lng: 22.576816},
            title:"Lublin",
            icon: icon1
          },
          {
            position: { lat: 50.722850, lng: 23.254177},
            title:"Zamość",
            icon: icon1
          },
          {
            position: { lat: 53.779764, lng: 20.477715},
            title:"Olsztyn",
            icon: icon1
          },
          {
            position: { lat: 53.123009, lng: 18.022390},
            title:"Bydgoszcz",
            icon: icon2
          },
          {
            position: { lat: 54.682312, lng: 25.261172},
            title:"Wilno",
            icon: icon2
          },
          {
            position: { lat: 52.462489, lng: 16.923638},
            title:"Poznań",
            icon: icon2
          },
          {
            position: { lat: 53.128861, lng: 23.179412},
            title:"Białystok",
            icon: icon1
          },
          {
            position: { lat: 50.261982, lng: 19.037405},
            title:"Katowice",
            icon: icon2
          },
          {
            position: { lat: 53.206056, lng: 22.774532},
            title:"Tykocin",
            icon: icon2
          },
          {
            position: { lat: 53.204882, lng: 23.340239},
            title:"Supraśl",
            icon: icon2
          },
          {
            position: { lat: 53.882386, lng: 21.354484},
            title:"Muntowo",
            icon: icon1
          },
          {
            position: { lat: 52.3577848, lng: 22.871947},
            title:"Kózki",
            icon: icon2
          },
          {
            position: { lat: 52.4168014, lng: 23.007973},
            title:"Góra Grabarka",
            icon: icon2
          }
        ];

        var mapOptions = {
          center: { lat: 52.239876, lng: 21.018622},
          zoom: 6,
          mapTypeId: google.maps.MapTypeId.TERRAIN,
          styles: styleArray
        };

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
            console.log(z);

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
              console.log(updatedScale);
            }
        });
      }
      google.maps.event.addDomListener(window, 'load', initialize);