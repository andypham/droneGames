// Run this to receive a png image stream from your drone.

var arDrone = require('ar-drone');
var http    = require('http');

console.log('Connecting png stream ...');

var client = arDrone.createClient();
client.config('video:video_channel', 3);
client.config('general:navdata_demo', true);
client.config('general:vision_enable', true);

var pngStream = arDrone.createPngStream();

var lastPng;
pngStream
  .on('error', console.log)
  .on('data', function(pngBuffer) {
    lastPng = pngBuffer;
  });

var lastData;
client.on('navdata', function(data) {
  lastData = data;
});

var server = http.createServer(function(req, res) {
  if (!lastPng) {
    res.writeHead(503);
    res.end('Did not receive any png data yet.');
    return;
  }

  res.writeHead(200, {'Content-Type': 'image/png'});
  //console.log(lastData.demo.rotation);
  console.log(lastData);
  res.end(lastPng);
});

server.listen(8080, function() {
  console.log('Serving latest png on port 8080 ...');
});

