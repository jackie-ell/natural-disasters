const scraper = require('./scraper.js')
const GeoJSON = require('geojson')

// scraper.scrapeHurricane('http://weather.unisys.com/hurricane/e_pacific/tracks.epa')
// .then(data => {
//   console.log(data.features[0])
// })
// .catch(err => console.error(err))

const hurricaneUrl = [
  'http://weather.unisys.com/hurricane/atlantic/tracks.atl',
  'http://weather.unisys.com/hurricane/e_pacific/tracks.epa'/*,
  'http://weather.unisys.com/hurricane/w_pacific/tracks.wpa',
  'http://weather.unisys.com/hurricane/s_indian/tracks.she',
  'http://weather.unisys.com/hurricane/n_indian/tracks.nio'*/
]

async function scrapeData(){
  const results = [
    await scraper.scrapeHurricane(hurricaneUrl[0]),
    await scraper.scrapeHurricane(hurricaneUrl[1])
    /*await scraper.scrapeHurricane(hurricaneUrl[2])
    await scraper.scrapeHurricane(hurricaneUrl[3])
    await scraper.scrapeHurricane(hurricaneUrl[4])*/
  ]

  const resultObj = {
    type: 'FeatureCollection',
    features: new Array().concat(
      results[0].features,
      results[1].features
    )
  }

  return resultObj
}

scrapeData()
.then(data => console.log(data))
.catch(err => console.error(data))
