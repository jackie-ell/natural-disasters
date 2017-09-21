const express = require('express')
const path = require('path')
const logger = require('morgan')

// ROUTE DIRECTORIES
const home = require('./routes/home')
const hurricanes = require('./routes/api/hurricanes')
const earthquakes = require('./routes/api/earthquakes')

const app = express()

// Configure our Express app to use ejs as our templating engine
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'))

// USE ROUTE DIRECTORIES
app.use('/', home)
app.use('/api/hurricanes', hurricanes)
app.use('/api/earthquakes', earthquakes)

// 404 - NOT FOUND
app.use((req, res) => {
  res.status(404)

  res.render('error')
})


const PORT = 3001

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Server listening on http://localhost:${PORT}`)
})
