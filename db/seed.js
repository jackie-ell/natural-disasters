const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const scraper = require('../scraper.js')

const url = 'mongodb://localhost:27017/disaster';

const hurricaneUrl = [
  'http://weather.unisys.com/hurricane/atlantic/tracks.atl',
  'http://weather.unisys.com/hurricane/e_pacific/tracks.epa',
  'http://weather.unisys.com/hurricane/w_pacific/tracks.wpa',
  'http://weather.unisys.com/hurricane/s_indian/tracks.she',
  'http://weather.unisys.com/hurricane/n_indian/tracks.nio'
]

/*
TODO:
*/

async function scrapeData(){
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

/* HURRICANES SEED */
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);

  scrapeData()
  .then(data => {
    return function(db, callback) {
      db.collection('hurricanes').insertMany(
        data.features,
        function(err, result) {
         assert.equal(err, null)
         console.log(`Inserted ${result.insertedCount} rows into hurricanes collection.`);
         callback()
      })
    }
  })
  .catch(err => console.error(err))
  .then(fn => {
   fn(db, function() {
     db.close()
   })
  })
});







/* */
