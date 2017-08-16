/** Script ACLs do not delete
 read=nobody
 write=nobody
 execute=anonymous
 **/
var factory = require("./predix/scripts/factory");

// get a token for clientId == parking2
var predix = new factory({credentials:{clientId:"hackathon", clientPassword:"@hackathon"},
  username: 'hackathon',
  userPassword: '@hackathon'
});
predix.initializeToken().then(() => {
  // get an instance of ParkingManager
  var trafficManager = predix.getTrafficManager();

  // Specify location of the parking slot
  var boundary1 = "32.123:-117";
  var boundary2 = "32.714983:-117.158012";

  // To simplify, just get the first 20 parking spots at this location (if any)
  var options = {
    "page": 0,
    "size": 20
  };

  // trafficManager.listTrafficLanes(boundary1, boundary2, options).then((result) => {
  //   var lanes = [];
  //   var promises = [];
  //   for (var i = 0; i < result.locations.length; i++) {
  //     var lane = result.locations[i];
  //     promises.push(getTrafflicFlow(lane, boundary1, boundary2, options))
  //   }
  //   Promise.all(promises).then((responses) => {
  //     responses.forEach((response) => {
  //       report.push(response);
  //     });
  //   return report;
  //   })
  // });
});

function getTrafficFlow(lane, boundary1, boundary2, options) {
  return new Promise((resolve, reject) => {
    lane.listTrafficAssets(boundary1, boundary2, options).then((assetList) => {
      var asset = assetList[0];

      // Get last page of Vehicles In and Vehicle Out event since the last 24h for the given asset
      var endDate = new Date();
      var endTime = endDate.getTime();
      var startTime = endTime - (24 * 3600000);

      resolve({
        lane: lane["location-uid"],
        location: lane.coords,
        start: startTime,
        end: endTime,
        flow: lane.listTrafficFlow(startTime, endTime, options)
      });

    });

  });
}
