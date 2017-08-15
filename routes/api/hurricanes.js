const express = require('express')
const router = express.Router()
const cors = require('cors')
const {index} = require('../../controllers/hurricanes')

router.get('/', cors(), index)

module.exports = router
