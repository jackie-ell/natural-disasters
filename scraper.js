const fetch = require('node-fetch')
const GeoJSON = require('geojson')


/*
Takes historical data from http://weather.unisys.com/hurricane/atlantic/tracks.atl
and returns a GeoJSON version of the data.
Limitations: Only gets first lat/lng combination for a storm on a certain day.
(Any more and the database would be roughly 4x as big)
*/
module.exports = {
  scrapeHurricane: function(url){
      return new Promise((res, rej) => {
        const regexHeader = new RegExp(/[0-9]+\s[0-9]{2}\/[0-9]{2}\/[0-9]{4}\s*M=\s*[0-9]+\s*[0-9]+\s*SNBR=\s*[0-9]+\s[\w\s]+XING=[0-1]\s*SSS=[0-9]/)
        const regexFooter = new RegExp(/[0-9]{5}\s*(HR|TS|SS)[A-Z0-9]*\s*/)

        const regexDateFull = new RegExp(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/)
        const regexDateMin = new RegExp(/[0-9]{2}\/[0-9]{2}/)
        const regexName = new RegExp(/[A-Z\s]+(?=XING)/)
        const regexLoc = new RegExp(/[0-9]{3}\s[0-9]{3}/)

        let objData = []
        let newObj = {};

        let dateFull, year, month, day, name, loc, lat, lng;
        fetch(url)
          .then(res => res.text())
          .then(body => {
            // console.log(body);

            const lines = body.split("\n")

            for(let line of lines){
              /* HEADER */
              if(regexHeader.test(line)){
                dateFull = line.match(regexDateFull)[0]
                year = dateFull.slice(-4)
                name = line.match(regexName)[0].trim()


              /* FOOTER */
              }else if (regexFooter.test(line)) {
                /* Storm type could be recorded here */

            /* end line */
            }else{
                dateMin = line.match(regexDateMin)
                /* end of line */
                if(dateMin == null){
                  continue;
                }

                dateMin = dateMin[0]

                month = dateMin.slice(0,2)
                day = dateMin.slice(3)

                loc = line.match(regexLoc)

                /* If lat/lng data was not included, skip this line */
                if(loc == null){
                  continue;
                }

                loc = loc[0]

                lat = `${loc[0]}${loc[1]}.${loc[2]}`
                lng = `${loc[4]}${loc[5]}.${loc[6]}`

                newObj = {
                  category: "Hurricane",
                  name: name,
                  year: year,
                  month: month,
                  day: day,
                  lat: lat,
                  lng: lng
                }

                objData.push(newObj)
              }
            }
            const returnJSON = GeoJSON.parse(objData, {Point: ['lat', 'lng']})
            console.log(`Scraped: ${Object.keys(returnJSON.features).length} objects.`)
            res(returnJSON)
          })
      })
  }
}
