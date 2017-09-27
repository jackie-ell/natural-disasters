const RequestService = require('../services/request')

module.exports = {
  // URL/api/earthquakes/
  // URL/api/earthquakes?year=2000&month=06&day=23
  index (req, res/*, next*/) {
    const rs = new RequestService(req, res, 'earthquakes')
    rs.getData()
  }
}
