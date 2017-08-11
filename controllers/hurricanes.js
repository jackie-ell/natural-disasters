const {MongoClient} = require('mongodb');
const assert = require('assert');

const url = 'mongodb://localhost:27017/disaster';

module.exports = {
  // URL/api/hurricanes/
  // URL/api/hurricanes?year=2000&month=06&day=23
  index (req, res, next) {
    /*
    Object.entries(params).map(
      ([key, value]) => ({[`properties.${key}`]: value})
    )
    */

    /* Get variables from url */
    const {
      year,
      month,
      day,
      limit
    } = req.query


    /* $match */
    let matchQuery = []

    if (year) { matchQuery.push({["properties.year"]: parseInt(year)}) }
    if (month) { matchQuery.push({["properties.month"]: parseInt(month)}) }
    if (day) { matchQuery.push({["properties.day"]: parseInt(day)}) }

    if(matchQuery.length > 1){
      matchQuery = {$and: matchQuery}
    }else{
      matchQuery = matchQuery[0]
    }

    if(matchQuery !== undefined){
      matchQuery = {$match: matchQuery}
    }
    else {
      matchQuery = null
    }


    res.send(matchQuery)

    /**/

    // MongoClient.connect(url, (err, db) => {
    //   assert.equal(err, null)
    //
    //   db.collection('hurricanes').aggregate([
    //     { $match: {"properties.year": year} }
    //   ],
    //   (err, result) => {
    //     assert.equal(err, null)
    //
    //     db.close()
    //     res.send({year, month, day, limit})
    //   })
    // })
  }
}
