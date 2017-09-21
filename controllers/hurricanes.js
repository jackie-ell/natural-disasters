const RequestService = require('../services/request')

module.exports = {
  // URL/api/hurricanes/
  // URL/api/hurricanes?year=2000&month=06&day=23
  index (req, res/*, next*/) {
    RequestService.set(req, res, 'hurricanes')
    RequestService.getData()
  }
}
