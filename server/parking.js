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
  // console.log(predix);
  // // get an instance of ParkingManager
  // var parkingManager = predix.getParkingManager();
  //
  // // Specify location of the parking slot
  // var boundary1 = "32.123:-117";
  // var boundary2 = "32.714983:-117.158012";
  //
  // // To simplify, just get the first 20 parking spots at this location (if any)
  // var options = {
  //     "page": 0,
  //     "size": 20
  // };
  //
  // // list all the parking spots within the above boundaries
  // parkingManager.listParkingSpots(boundary1, boundary2, options, function (result) {
  //   // iterate through the list of parking spot and determine each parking spot availability
  //   var report = [];
  //   for (var i = 0; i < result.locations.length; i++) {
  //
  //     var parkingSpot  =  result.locations[i];
  //     report.push(findAvailability(parkingSpot));
  //   }
  //
  //   return report;
  // });

/*
 * For a given parking spot, get first monitoring device. Ask the device for the last IN and OUT events
 * If OUT.timstamp > IN.timestamp, then this parking spot is free
 */
function findAvailability(parkingSpot) {
  
  // For simplicity, we only consider the first device (asset) that is monitoring the parking spot
  var assetList = parkingSpot.listParkingAssets();
  var asset = assetList[0];

  // Get last page of Vehicles In and Vehicle Out event since the last 24h for the given asset
  var endDate = new Date();
  var endTime = endDate.getTime();
  var startTime = endTime - (24 * 3600000);
  
  var options = {    
    "size":1,
    "page":2000000
  };
  
  var vIn = asset.listVehiculesIn(startTime, endTime, options);
  var vOut = asset.listVehiculesOut(startTime, endTime, options);
  
  // Get last know In event for the selected parking parking slot
  var lastEventIn = lastEvent(vIn, parkingSpot["location-uid"]);
  
  // get last know Out event for current parking
  var lastEventOut = lastEvent(vOut, parkingSpot["location-uid"]);
  var lastIn = lastEventIn ? new Date(lastEventIn.timestamp) : new Date("1970-01-01");// no event, we consider parking is available
  var lastOut = lastEventOut ? new Date(lastEventOut.timestamp) : new Date(); // no event, we consider parking is available
  return {
    
    spot: parkingSpot["location-uid"],
    location: parkingSpot.coordinates,
    lastIn: lastIn, 
    lastOut: lastOut,
    available: lastOut.getTime() > lastIn.getTime()
  };
}

function lastEvent(eventList, parkingId) {
  
  var lastEvent = null;
  if (eventList) {
    for (var i =  eventList._embedded.events.length - 1; eventList && lastEvent == null && i >= 0; i--) {
  	  lastEvent = eventList._embedded.events[i]["location-uid"] == parkingId ? eventList._embedded.events[i] : lastEvent;
 	}
  }
  
  return lastEvent;
}			
