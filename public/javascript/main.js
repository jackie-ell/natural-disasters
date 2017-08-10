let map
let socket = io.connect()
let result
socket.on('query', function(data) {
  result = data
})

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49, lng: -123},
    zoom: 5
  });

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: loadHurricanes(),
    map: map
  });
}

function loadHurricanes(){
  return new Array(
    for (let line of result) {
      let coords = line.geometry.coordinates;
      let latLng = new google.maps.LatLng(coords[1],coords[0]);
      let marker = new google.maps.Marker({
        position: latLng,
        //map: map
      });
    }
  )
}
