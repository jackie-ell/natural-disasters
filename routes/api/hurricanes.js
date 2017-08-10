const express = require('express')
const router = express.Router()
const {index} = require('../../controllers/hurricanes')

router.get('/', index)

module.exports = router
