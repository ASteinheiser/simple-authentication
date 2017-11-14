var bodyParser = require('body-parser')
var express = require('express')
var session = require('express-session')
var mongoose = require('mongoose')

var app = express()
app.use(session({ secret: 'super-secret', resave: true, saveUninitialized: false }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var routes = require('./routes/routes.js')
app.use('/', routes)

mongoose.connect('mongodb://localhost/simpleAuthentication', { useMongoClient: true })
var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
})

app.use(function (req, res, next) {
  return res.status(404).send({ error: 'Not found' })
})

app.use(function (err, req, res, next) {
  res.status(500).send('Internal Server Error')
})

app.listen(3000, function () {
  console.log('Express app listening on localhost:3000')
})
