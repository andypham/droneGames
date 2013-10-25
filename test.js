var arDrone = require('ar-drone');
var client = arDrone.createClient();
//client.disableEmergency();
var pngStream = client.createPngStream();
//pngStream.on('data', console.log);
client.config('general:navdata_demo', 'FALSE');


var lastData;
var goFly = 1;

var reduced = 0;
var target = 49;

//--var height = lastData.altitude.raw;
client.on('navdata', function(data) {
  lastData = data;
  stableHeight(data.altitude.raw);
  stableXY(lastData.demo);
});



function stableXY(data) {
  var th = 0.1;
  var stFB;
  if (data.frontBackDegrees < -th ) {
    client.back(0.1);
    stFB = "back";
  } else {
    if (data.frontBackDegrees > th) {
    client.front(0.1);
    stFB = "front";
    } else {
      client.front(0);
    }
  }

  var stLR;
  if (data.leftRightDegrees > th) {
    client.left(0.1);
    stLR = "left";
  } else if ( data.leftRightDegrees < -th) {
    client.right(0.1);
    stLR = "right";
  } else {
    client.right(0);
  }

  //console.log("><2",stFB, stLR);

}

function stableHeight(currentHeight) {

  var threshold = [-100000, 240, 280, 290, 300, 310, 320,360, 1000000];
  var speed = [0.3,         0.1, 0.05, 0, -0.05, -0.1 , -0.3, -0.5];

  var i = 0;
  for (; i< threshold.length-1; i++) {
    if (currentHeight >= threshold[i] && currentHeight < threshold[i+1]) {
      break;
    }
  }
  var newSpeed = speed[i]/2;
  console.log(currentHeight, newSpeed);
  if (i==3) {
    client.stop();
  } else {
    client.up(newSpeed);
  }

}

setInterval(function() {
  /*
  console.log(lastData.pressureRaw);
  console.log( lastData.altitude.raw);
  console.log( lastData.demo.velocity);
  console.log( lastData.demo.frontBackDegrees);
  console.log( lastData.demo.leftRightDegrees);
  */
  //console.log(lastData.magneto);
}, 1000);

/*
  var degree = lastData.demo.rotation.clockwise;
  console.log(degree);
  if (degree >= 0 && degree <= 100) {
      if (degree >= 48 && degree <=50) {
      client.stop();
      client.land();
      return;
      }
      if (degree < 38) {
        client.clockwise(0.2);
	return;
      } 
      if (degree > 60) {
        client.counterClockwise(0.2);
	return;
      }
    } 
});
*/


client.animateLeds('blinkOrange', 5, 5);

if ( goFly ) {
console.log("flying");
client.takeoff();
//client.config('control:flight_anim', '3,2');
//client.animate('turnaroundGodown', 1000);

client.after(1000, function() {
  console.log("><1");
//  client.front(0.1);
  //this.animate('flipLeft', 1500);
//  this.animate('wave', 1500);
//  this.config("detect:enemy_colors","2");
//  console.log(lastData.rawMeasures);
});

client.after(2000, function() {
 // this.back(0.1);
  //this.stop();
 // console.log(lastData.rawMeasures);
});


client.after(40000, function() {
 // console.log(lastData);
//  console.log(lastData.rawMeasures);
  this.land();
});
}
