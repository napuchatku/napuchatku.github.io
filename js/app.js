'use strict';
function init() {
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions),
      infowindow = new google.maps.InfoWindow(),
      markers = [];

  function setMarker(i) {
    markers[i] = new google.maps.Marker({
      position: locationsArray[i].position,
      title: locationsArray[i].title,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        strokeColor: '#E83230', 
        scale: 3
      },
      map: map
    });
  }

  function attachInfoWindow(i) {
    var content = '<h1>' + markers[i].title + '</h1>';
    google.maps.event.addListener(markers[i], 'click', function() {
      infowindow.setContent(content);
      infowindow.open(map, markers[i]);
    });
  }

  for (var i = 0; i < locationsArray.length; i++) {
    setMarker(i);
    attachInfoWindow(i);
  }
}

google.maps.event.addDomListener(window, 'load', init);