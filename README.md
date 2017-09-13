# Natural Disasters API

![JSON](https://raw.githubusercontent.com/jackie-ell/natural-disasters/master/public/images/Screen%20Shot%202017-09-13%20at%201.11.04%20PM.png)

## About
This API is designed to gather thousands of natural disasters in one place.

Each set of data is formatted in GeoJSON and contains latitude/longitude data, intended for use in the Google Maps API.

## How To Use
`http://localhost:3001/api/hurricanes?var1=x&var2=y`

### Specific Date Variables

**Variable	- Description	- Mongo equiv.**
- **year**	Specifies the year to match on	`"year": x`
- **month**	Specifies the month to match on	`"month": x`
- **day**	Specifies the day to match on	`"day": x`

*Note: Specific Dates cannot be used in conjunction with Between Dates.*

### Between Date Variables

**Variable -	Description	- Mongo equiv.**
- **yearStart**	Searches for years greater than or equal to specified number	`"year": { $gte: x }`
- **yearEnd**	Searches for years less than or equal to specified number	`"year": { $lte: x }`
- **monthStart**	Searches for months greater than or equal to specified number	`"month": { $gte: x }`
- **monthEnd**	Searches for months less than or equal to specified number	`"month": { $lte: x }`
- **dayStart**	Searches for days greater than or equal to specified number	`"day": { $gte: x }`
- **dayEnd**	Searches for days less than or equal to specified number	`"day": { $lte: x }`

*Note: Specific Dates cannot be used in conjunction with Between Dates.*

### Universal Variables

**Variable - Description -	Mongo equiv.**
- **limit**	Limits the number of returned data sets (Default: Unlimited)	`.limit(x)`

### Example

`http://localhost:3001/api/hurricanes?year=2011&month=6&day=22`
```
[
  {
    "_id": "597c16a4e7ac8c1fd42980da",
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [
        105.9,
        19
      ]
    },
    "properties": {
      "category": "Hurricane",
      "name": "BEATRIZ",
      "year": 2011,
      "month": 6,
      "day": 22
    }
  }
]
```
