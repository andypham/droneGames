var arDrone = require('ar-drone');
var http    = require('http');
var client = arDrone.createClient();
var pngStream = client.createPngStream();
var lastPng;
var buffer = new Buffer("I'm a string!", "utf-8");
console.log("><1", buffer.toString());


pngStream.on('data', function(png) {
  lastPng = png;
  console.log("><2");
});

setInterval(function() {
  /*
  console.log(lastData.pressureRaw);
  console.log(lastData.magneto.raw);
  console.log( lastData.altitude.raw);
  */
  if (lastPng) {
    /*
  console.log(lastPng);
  console.log(lastPng.toString('ac', 0, 40));
  my("localhost:8080");
  exit(1);
  */
  }
}, 1000);

//client.on('navdata', da);
//console.log(da);
//client.animateLeds('blinkOrange', 5, 2);

/*
var server = http.createServer(function(req, res) {
  if (!lastPng) {
    res.writeHead(503);
    res.end('Did not receive any png data yet.');
    return;
  }

  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(lastPng);
});

server.listen(8080, function() {
  console.log('Serving latest png on port 8080 ...');
});

*/
