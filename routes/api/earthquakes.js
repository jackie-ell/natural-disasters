const express = require('express')
const router = express.Router()
const cors = require('cors')
const {index} = require('../../controllers/earthquakes')

router.get('/', cors(), index)

module.exports = router
