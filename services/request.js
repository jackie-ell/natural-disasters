const {MongoClient} = require('mongodb')
const assert = require('assert')
const QueryService = require('./query')

const url = require('../config/params').db

class RequestService {
  constructor(req, res, collection){
    this.req = req
    this.res = res
    this.collection = collection
  }

  getData(){
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
    } = this.req.query

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
      return this.res.status(400).send('Bad Request - Did you mix and match selectors?')
    }else{
      MongoClient.connect(url, (err, db) => {
        assert.equal(err, null)

        db.collection(this.collection).find(query).limit(parseInt(limit))
          .toArray((err, result) => {
            assert.equal(err, null)

            db.close()
            return this.res.json(result)
          })
      })
    }
  }
}

module.exports = RequestService
