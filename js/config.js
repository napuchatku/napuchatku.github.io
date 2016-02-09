var styleArray = [
  {
    featureType: "road",
    stylers: [
      { visibility: "off" }
    ]
  }
];

var mapOptions = {
  center: { lat: 52.239876, lng: 21.018622},
  zoom: 5,
  mapTypeId: google.maps.MapTypeId.TERRAIN,
  styles: styleArray
};