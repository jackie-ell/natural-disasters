const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/disaster';

module.exports = {
  index (req, res, next) {
    MongoClient.connect(url, (err, db) => {
      assert.equal(err, null)
      db.collection('hurricanes').aggregate([
        { $match: {"properties.year": 2005} }
        ], (err, result) => {
          assert.equal(err, null)

          db.close()
          res.send(result)
      })
    })
  },

  
}
