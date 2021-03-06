const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const scraper = require('./scraper.js')
const fs = require('fs')

const url = require('../config/params').db

const hurricaneUrl = [
  'http://weather.unisys.com/hurricane/atlantic/tracks.atl',
  'http://weather.unisys.com/hurricane/e_pacific/tracks.epa',
  'http://weather.unisys.com/hurricane/w_pacific/tracks.wpa',
  'http://weather.unisys.com/hurricane/s_indian/tracks.she',
  'http://weather.unisys.com/hurricane/n_indian/tracks.nio'
]

const earthquakeCSV = [
  'data/isc-gem-cat.csv'
]

/*
TODO:
*/

async function scrapeHurricaneData(){
  const results = [
    await scraper.scrapeHurricane(hurricaneUrl[0]),
    await scraper.scrapeHurricane(hurricaneUrl[1]),
    await scraper.scrapeHurricane(hurricaneUrl[2]),
    await scraper.scrapeHurricane(hurricaneUrl[3]),
    await scraper.scrapeHurricane(hurricaneUrl[4])
  ]

  const resultObj = {
    type: 'FeatureCollection',
    features: new Array().concat(
      results[0].features,
      results[1].features,
      results[2].features,
      results[3].features,
      results[4].features
    )
  }

  return resultObj
}

async function scrapeEarthquakeData(){
  const csv = fs.readFileSync('data/isc-gem-cat.csv', 'utf-8', (err,data)=>{
    assert(err, null)

    return data
  })

  const results = [
    await scraper.scrapeEarthquake(csv)
  ]

  const resultObj = {
    type: 'FeatureCollection',
    features: new Array().concat(
      results[0].features
    )
  }

  return resultObj
}

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);

  (async function() {
    const hurricanes = await scrapeHurricaneData()
    const earthquakes = await scrapeEarthquakeData()

    /* EARTHQUAKES SEED */
    db.collection('earthquakes').insertMany(
      earthquakes.features,
      function(err, result) {
       assert.equal(err, null)
       console.log(`Inserted ${result.insertedCount} rows into earthquakes collection.`);

      /* HURRICANES SEED */
       db.collection('hurricanes').insertMany(
         hurricanes.features,
         function(err, result) {
          assert.equal(err, null)
          console.log(`Inserted ${result.insertedCount} rows into hurricanes collection.`);

          db.close()
       })
    })
  })()

});







/* */
