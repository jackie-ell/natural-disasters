const scraper = require('./scraper.js')
const GeoJSON = require('geojson')

scraper.scrapeEarthquake('./data/isc-gem-cat.csv')
.then(data => {
  console.log(data.features[0])
})
.catch(err => console.error(err))
