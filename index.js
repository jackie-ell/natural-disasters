const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/disaster';


//const home = require('./routes/home');

const app = express();

const server = require('http').Server(app)
const io = require('socket.io')(server)

// Configure our Express app to use ejs as our templating engine
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

//app.use('/', home);


app.get('/', (req, res, next) => {
  res.render('index')
})

io.on('connection', function(socket){
  MongoClient.connect(url, (err, db) => {
    assert.equal(err, null)
    db.collection('hurricanes').aggregate([
        { $match: {"properties.year": 2005} }
      ], (err, result) => {
        assert.equal(err, null)

        db.close()
        socket.emit('query', result)
      })
  })
})

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
