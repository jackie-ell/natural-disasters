const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const scraper = require('../scraper.js')

const url = 'mongodb://localhost:27017/disaster';

const hurricaneUrl = ['http://weather.unisys.com/hurricane/atlantic/tracks.atl']

/* HURRICANES SEED */

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);

  scraper.scrapeHurricane(hurricaneUrl[0])
  .then(data => {
    return function(db, callback) {
      db.collection('hurricanes').insertMany(
        data.features,
        function(err, result) {
         assert.equal(err, null, console.error(err))
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
