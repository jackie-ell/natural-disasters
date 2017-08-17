const {MongoClient} = require('mongodb')
const assert = require('assert')
const QueryService = require('../services/query')

const url = 'mongodb://localhost:27017/disaster'

module.exports = {
  // URL/api/hurricanes/
  // URL/api/hurricanes?year=2000&month=06&day=23
  index (req, res/*, next*/) {
    /* Get variables from url */
    const {
      year,
      month,
      day,
      yearStart,
      yearEnd,
      monthStart,
      monthEnd,
      dayStart,
      dayEnd,
      limit = 0
    } = req.query

    const query = QueryService.getQuery(
      year,
      month,
      day,
      yearStart,
      yearEnd,
      monthStart,
      monthEnd,
      dayStart,
      dayEnd
    )

    if(query === false){
      res.status(400).send('Bad Request - Did you mix and match selectors?')
    }else{
      MongoClient.connect(url, (err, db) => {
        assert.equal(err, null)

        db.collection('hurricanes').find(query).limit(parseInt(limit))
          .toArray((err, result) => {
            assert.equal(err, null)

            db.close()
            res.json(result)
          })
      })
    }
  }
}
