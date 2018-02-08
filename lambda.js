'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const app = express()

const OSRM = require('osrm');

let osrm = new OSRM('${__dirname}data/mexico-latest.osrm');

app.set('view engine', 'pug')
app.use(compression())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(awsServerlessExpressMiddleware.eventContext())

app.get('/', (req, res) => {
  res.render('index', {
    apiUrl: req.apiGateway ? `https://${req.apiGateway.event.headers.Host}/${req.apiGateway.event.requestContext.stage}` : 'http://localhost:3000'
  })
})
app.get('/match', (req, res) => {

  let input = req.query.coordinates
    input = input.split(';')
    let coordinates = new Array()
    for (var i = 0; i < input.length; i++) {
        var a = input[i].split(',');
        coordinates.push(a)
    }

    let options = {
        coordinates: coordinates,
    timestamps: req.query.timestamp.split(';')
    }

  osrm.match(options, function(err, response) {
      if (err) throw err;
      console.log(response.tracepoints); // array of Waypoint objects
      console.log(response.matchings); // array of Route objects
      res.json(response)
  });

})

// Export your express server so you can import it in the lambda function.
module.exports = app
