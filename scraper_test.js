const scraper = require('./scraper.js')

scraper.scrapeHurricane('http://weather.unisys.com/hurricane/atlantic/tracks.atl')
//scraper.scrapeHurricane()

/*
let body = `50070 08/05/1978 M= 4  3 SNBR=1066 BESS        XING=0 SSS=0
50075 08/05*  0   0   0    0*  0   0   0    0*253 904  20 1012*251 910  20 1012*
50080 08/06*248 918  25 1011*245 925  30 1010*242 933  30 1009*239 940  35 1008*
50085 08/07*233 950  40 1007*228 957  40 1006*222 962  40 1005*216 966  45 1006*
50090 08/08*211 968  45 1007*204 969  40 1008*200 970  25 1010*  0   0   0    0*
50095 TS `
*/
