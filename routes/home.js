const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const router = express.Router();

const url = 'mongodb://localhost:27017/disaster';



router.get('/', (req, res, next) => {
  MongoClient.connect(url, (err, db) => {
    assert.equal(err, null)
    db.collection('hurricanes').aggregate([
        { $match: {"properties.year": 2005} }
      ], (err, result) => {
        assert.equal(err, null)

        db.close()
        res.render('index', {result: result})
      })
  })
})

module.exports = router;
