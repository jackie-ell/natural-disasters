const q = (target) => { return document.querySelector(target) }

const getData = (query) => {
  return fetch(query)
          .then(res => res.json())

}



document.addEventListener('DOMContentLoaded', () => {
  const testBtn = q('#api-test-btn')
  const testOutput = q('#api-test-output')

  const defaultQuery = 'http://localhost:3001/api/hurricanes?year=2011&month=6&day=22'

  const setOutput = (query) => {
    getData(query)
      .then(json => JSON.stringify(json,null,2))
      .then(json => testOutput.innerHTML = json)
  }

  setOutput(defaultQuery)

  testBtn.addEventListener('click', event => {
    event.preventDefault()

    let query = q('#api-test').value

    setOutput(query)
  })
})

// let map
// let socket = io.connect()
// let result
// socket.on('query', function(data) {
//   result = data
// })
//
// function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: 49, lng: -123},
//     zoom: 5
//   });
//
//   heatmap = new google.maps.visualization.HeatmapLayer({
//     data: loadHurricanes(),
//     map: map
//   });
// }
//
// function loadHurricanes(){
//   return new Array(
//     for (let line of result) {
//       let coords = line.geometry.coordinates;
//       let latLng = new google.maps.LatLng(coords[1],coords[0]);
//       let marker = new google.maps.Marker({
//         position: latLng,
//         //map: map
//       });
//     }
//   )
// }
