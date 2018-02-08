const ApiBuilder = require("claudia-api-builder");
let api = new ApiBuilder();

const OSRM = require('osrm');
let osrm = new OSRM('data/mexico-latest.osrm');

api.get('/match/{coordinates, timestamp}', function (request) {
  let options = {
    let input = request.pathParams.coordinates
    input = input.split(';')
    coordinates = array()
    for i = 0 i < input.length, i++{
      a = input[i].split(',');
      coordinates.push(a)
    }
    coordinates: coordinates,
    timestamps: request.pathParams.timestamp.split(';')
  };
  osrm.match(options, function(err, response) {
      if (err) throw err;
      console.log(response.tracepoints); // array of Waypoint objects
      console.log(response.matchings); // array of Route objects
      res.json(response)
  });

})

// Export your express server so you can import it in the lambda function.
module.exports = api
