//const scraper = require('./scraper.js')
const fs = require('fs')
const GeoJSON = require('geojson')

// scraper.scrapeEarthquake('./data/isc-gem-cat.csv')
// .then(data => {
//   console.log(data.features[0])
// })
// .catch(err => console.error(err))

const regexDateFull = /[0-9]{4}-[0-9]{2}-[0-9]{2}/

fs.readFile('./data/isc-gem-cat.csv', 'utf8', function(err,data) {
  if (err) {
    return console.error(err)
  }

  console.log(data)
})
