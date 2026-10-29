function myMap() {

  var mapProp = {
    center: new google.maps.LatLng(6.5244, 3.3792),
    zoom: 12,
  };

  var map = new google.maps.Map(
    document.getElementById("googleMap"),
    mapProp
  );

  var marker = new google.maps.Marker({
    position: { lat: 6.5244, lng: 3.3792 },
    map: map,
    title: "Lagos, Nigeria"
  });

}