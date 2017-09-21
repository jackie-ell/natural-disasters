const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = require('../config/params').db


MongoClient.connect(url, (err, db) => {
  assert.equal(err, null)


  db.collection('hurricanes').drop((err, reply) => {
    assert.equal(err, null)

    // eslint-disable-next-line
    console.log(reply)

    db.collection('earthquakes').drop((err, reply) => {
      assert.equal(err, null)

      // eslint-disable-next-line
      console.log(reply)
      db.close()
    })
  })
})
