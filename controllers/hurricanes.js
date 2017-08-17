const {MongoClient} = require('mongodb')
const assert = require('assert')

const url = 'mongodb://localhost:27017/disaster'


function singleDates(year, month, day){
  let query = {}

  if (year) { query['properties.year'] = parseInt(year) }
  if (month) { query['properties.month'] = parseInt(month) }
  if (day) { query['properties.day'] = parseInt(day) }

  return query
}

function betweenDates(yearStart, yearEnd, monthStart, monthEnd, dayStart, dayEnd){
  let query = {}

  if (yearStart) {
    query['properties.year'] = {}
    query['properties.year']['$gte'] = parseInt(yearStart)
  }
  if (yearEnd) {
    if(query['properties.year'] === undefined) {query['properties.year'] = {} }
    query['properties.year']['$lte'] = parseInt(yearEnd)
  }

  if (monthStart) {
    query['properties.month'] = {}
    query['properties.month']['$gte'] = parseInt(monthStart)
  }
  if (monthEnd) {
    if(query['properties.month'] === undefined) {query['properties.month'] = {} }
    query['properties.month']['lte'] = parseInt(monthEnd)
  }

  if (dayStart) {
    query['properties.day'] = {}
    query['properties.day']['$gte'] = parseInt(dayStart)
  }
  if (dayEnd) {
    if(query['properties.day'] === undefined) {query['properties.day'] = {} }
    query['properties.day']['$lte'] = parseInt(dayEnd)
  }

  return query
}

module.exports = {
  // URL/api/hurricanes/
  // URL/api/hurricanes?year=2000&month=06&day=23
  index (req, res/*, next*/) {
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
      yearStart,
      yearEnd,
      monthStart,
      monthEnd,
      dayStart,
      dayEnd,
      limit = 0
    } = req.query

    let query

    if((year||month||day) && (yearStart||yearEnd||monthStart||monthEnd||dayStart||dayEnd)){
      res.send('Cannot query on specified and between dates.')
    } else if (year || month || day) {
      query = singleDates(year, month, day)
    } else if (yearStart||yearEnd||monthStart||monthEnd||dayStart||dayEnd) {
      query = betweenDates(yearStart, yearEnd, monthStart, monthEnd, dayStart, dayEnd)
    }

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
