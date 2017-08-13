const express = require('express')
const router = express.Router()


router.get('/', (req, res, next) => {
  res.locals.url = req.get('host')
  res.render('../views/index')
})

module.exports = router;
