let map

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49, lng: -123},
    zoom: 5
  });
}

function loadHurricanes(){
  for (let line of result) {
    let coords = line.features.geometry.coordinates;
    let latLng = new google.maps.LatLng(coords[1],coords[0]);
    let marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }
}
