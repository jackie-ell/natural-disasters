const scraper = require('./scraper.js')
const GeoJSON = require('geojson')

scraper.scrapeHurricane('http://weather.unisys.com/hurricane/e_pacific/tracks.epa')
.then(data => {
  console.log(data.features[0])
})
.catch(err => console.error(err))
