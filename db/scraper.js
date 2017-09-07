const fetch = require('node-fetch')
const GeoJSON = require('geojson')
const fs = require('fs')
const assert = require('assert')


/*
Takes historical data from http://weather.unisys.com/hurricane/atlantic/tracks.atl
and returns a GeoJSON version of the data.
Limitations: Only gets first lat/lng combination for a storm on a certain day.
(Any more and the database would be roughly 4x as big)
*/
module.exports = {
  scrapeHurricane: function(url){
    return new Promise((res, rej) => {
      if(url === undefined){
        rej(null)
      }

      const regexHeader = new RegExp(/[0-9]+\s[0-9]{2}\/[0-9]{2}\/[0-9]{4}\s*M=\s*[0-9]+\s*[0-9]+\s*SNBR=\s*[0-9]+\s[\w\s]+XING=[0-1]\s*SSS=[0-9]/)
      const regexFooter = new RegExp(/[0-9]{5}\s*(HR|TS|SS)[A-Z0-9]*\s*/)

      const regexDateFull = new RegExp(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/)
      const regexDateMin = new RegExp(/[0-9]{2}\/[0-9]{2}/)
      const regexName = new RegExp(/[A-Z\s]+(?=XING)/)
      const regexLoc = new RegExp(/[0-9]{3}\s?[0-9]{3,4}/)

      let objData = []
      let newObj = {}

      let dateFull, year, month, day, name, loc, lat, lng
      fetch(url)
        .then(res => res.text())
        .then(body => {

          const lines = body.split('\n')

          for(let line of lines){
            /* HEADER */
            if(regexHeader.test(line)){
              dateFull = line.match(regexDateFull)[0]
              year = parseInt(dateFull.slice(-4))
              name = line.match(regexName)[0].trim()


              /* FOOTER */
            }else if (regexFooter.test(line)) {
              /* Storm type could be recorded here */

            /* end line */
            }else{
              let dateMin = line.match(regexDateMin)
              /* end of line */
              if(dateMin == null){
                continue
              }

              dateMin = dateMin[0]

              month = dateMin.slice(0,2)
              day = dateMin.slice(3)

              loc = line.match(regexLoc)

              /* If lat/lng data was not included, skip this line */
              if(loc == null){
                continue
              }

              loc = loc[0]

              lat = parseFloat(`${loc[0]}${loc[1]}.${loc[2]}`)
              /* Fix for 4-digit longitude */
              if(loc.indexOf(' ') === -1){
                lng = parseFloat(`${loc.slice(3,-1)}.${loc[6]}`)
              }else{
                lng = parseFloat(`${loc[4]}${loc[5]}.${loc[6]}`)
              }

              newObj = {
                category: 'Hurricane',
                name: name,
                date: `${year}-${month}-${day} 00:00:00.00`,
                lat: lat,
                lng: lng
              }

              objData.push(newObj)
            }
          }
          const returnJSON = GeoJSON.parse(objData, {Point: ['lat', 'lng']})
          // eslint-disable-next-line
          console.log(`Scraped: ${Object.keys(returnJSON.features).length} objects.`)
          res(returnJSON)
        })
    })
  },

  /*
  Takes historical earthquake data from http://www.isc.ac.uk/iscgem/
  and returns a GeoJSON version of the data.
  #date,lat,lon,smajax,sminax,strike,q ,depth,unc,q,mw,unc,q,s,mo,fac,mo_auth,mpp,mpr,mrr,mrt,mtp,mtt,eventid

  */
  scrapeEarthquake: function(csv) {
    return new Promise((res,rej) => {


      if(csv === undefined){
        rej(null)
      }

      const csvSplit = csv.split('\n')

      let objData = []
      let newObj = {}

      for(let line of csvSplit) {
        // Ignore headers
        if(line.includes('#') || line === undefined){
          continue
        }

        // Split the line up and remove whitespace
        let splitLine = line.split(',')
        splitLine = splitLine.map((n) => n.trim())

        newObj = {
          category: 'Earthquake',
          date: splitLine[0],
          lat: splitLine[1],
          lng: splitLine[2],
          error: {
            smajax: splitLine[3],
            sminax: splitLine[4],
            strike: splitLine[5],
            q: splitLine[6]
          },
          depth: {
            depth: splitLine[7],
            unc: splitLine[8],
            q: splitLine[9]
          },
          mw: {
            mw: splitLine[10],
            q: splitLine[11],
            unc: splitLine[12],
            s: splitLine[13]
          },
          mo: splitLine[14],
          fac: splitLine[15],
          mo_auth: splitLine[16],
          tensor: {
            mpp: splitLine[17],
            mpr: splitLine[18],
            mrr: splitLine[19],
            mrt: splitLine[20],
            mtp: splitLine[21],
            mtt: splitLine[22]
          }
        }

        objData.push(newObj)
      }

      const returnJSON = GeoJSON.parse(objData, {Point: ['lat', 'lng']})
      // eslint-disable-next-line
      console.log(`Scraped: ${Object.keys(returnJSON.features).length} objects.`)
      res(returnJSON)
    })
  }
}









/**/
