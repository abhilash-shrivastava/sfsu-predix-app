/**
 * Created by Abhi on 5/20/17.
 */
/** Script ACLs do not delete
 read=nobody
 write=nobody
 execute=anonymous
 **/
/*#*SCRIPTR_PLUGIN*#*{"metadata":{"name":"CodeMirrorArbitraryFile","plugindata":{"fileData":"<!DOCTYPE html>\n<html>\n  <head>\n    <title>Simple Map</title>\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta charset=\"utf-8\">\n    <style>\n      html, body {\n        height: 100%;\n        margin: 0;\n        padding: 0;\n      }\n      #map {\n        height: 100%;\n      }\n\t .modal {\n        display: none; \n        position: fixed;\n        z-index: 1; \n        left: 0;\n        top: 0;\n        width: 100%; \n        height: 100%; \n        overflow: auto;\n        background-color: rgb(0,0,0); \n        background-color: rgba(0,0,0,0.4); \n     }\n     .modal-content {\n        background-color: #FFFFFF;\n        margin: 15% auto; \n        padding: 20px;\n        border: 1px solid #888;\n        font-family:calibri;\n        font-size:22px;\n        width: 60%;\n      }\n\n    </style>\n\t<script>\n      function placeMarkers(spots) {\n\n        for (var i = 0; i < spots.length; i++) {\n          \n          var locationStr = spots[i].location.P1;\n          var location = locationStr.split(\",\");\n          var marker = new google.maps.Marker({\n              position: {lat:Number(location[0]), lng: Number(location[1])},\n              map: map,\n              label: spots[i].available ? \"A\" : \"F\",\n              title: spots[i].spot + \": \" + (spots[i].available ? \"Available\" : \"Full\"),\n            });\n        }\n        \n        var modal = document.getElementById(\"loadingMsg\");\n        modal.style.display = \"none\";\n      }\n\n      function getParkingStatus() {\n\n        var modal = document.getElementById(\"loadingMsg\");\n        modal.style.display = \"block\";\n        var xhr = new XMLHttpRequest();\n        xhr.open(\"GET\", \"https://iotdemos.scriptrapps.io/predix/basicdemo/parking\");\n        xhr.onload = function() {\n\n          var httpResponse = JSON.parse(xhr.responseText);\n          placeMarkers(httpResponse.response.result);    \n        };\n\n        xhr.onerror = function(error) {\n\n          if (typeof(error) == \"object\") {\n            alert(JSON.stringify(error));\n          }else{\n            alert(error);\n          }\n        };\n        \n        xhr.send();\n      }\n\t</script>\n  </head>\n  <body onload=\"getParkingStatus()\">\n    <div id=\"map\"></div>\n    <script>\n      \n\t  var map = null;\n      function initMap() {\n        map = new google.maps.Map(document.getElementById('map'), {\n          center: {lat: 32.711526, lng: -117.157659}, \n          zoom: 18\n        });\n      }\n    </script>\n\t<script src=\"https://maps.googleapis.com/maps/api/js?key=AIzaSyBT2lgr9B0CzZSipJK9XSGllkfTUXICbQw&callback=initMap&libraries=drawing\" async defer></script>\n\t<div id=\"loadingMsg\" class=\"modal\">\n       <div class=\"modal-content\">         \n         <p>Searching for available parkings. Please wait...</p>\n       </div>\n    </div>\n  </body>\n</html>"},"scriptrdata":[]}}*#*#*/
var content= '<!DOCTYPE html>\n\
<html>\n\
  <head>\n\
    <title>Simple Map</title>\n\
    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n\
    <meta charset=\"utf-8\">\n\
    <style>\n\
      html, body {\n\
        height: 100%;\n\
        margin: 0;\n\
        padding: 0;\n\
      }\n\
      #map {\n\
        height: 100%;\n\
      }\n\
	 .modal {\n\
        display: none; \n\
        position: fixed;\n\
        z-index: 1; \n\
        left: 0;\n\
        top: 0;\n\
        width: 100%; \n\
        height: 100%; \n\
        overflow: auto;\n\
        background-color: rgb(0,0,0); \n\
        background-color: rgba(0,0,0,0.4); \n\
     }\n\
     .modal-content {\n\
        background-color: #FFFFFF;\n\
        margin: 15% auto; \n\
        padding: 20px;\n\
        border: 1px solid #888;\n\
        font-family:calibri;\n\
        font-size:22px;\n\
        width: 60%;\n\
      }\n\
\n\
    </style>\n\
	<script>\n\
      function placeMarkers(spots) {\n\
\n\
        for (var i = 0; spots && i < spots.length; i++) {\n\
          \n\
          var locationStr = spots[i].location.P1;\n\
          var location = locationStr.split(\",\");\n\
          var marker = new google.maps.Marker({\n\
              position: {lat:Number(location[0]), lng: Number(location[1])},\n\
              map: map,\n\
              label: spots[i].available ? \"A\" : \"F\",\n\
              title: spots[i].spot + \": \" + (spots[i].available ? \"Available\" : \"Full\"),\n\
            });\n\
        }\n\
        \n\
        var modal = document.getElementById(\"loadingMsg\");\n\
        modal.style.display = \"none\";\n\
      }\n\
\n\
      function getParkingStatus() {\n\
\n\
        var modal = document.getElementById(\"loadingMsg\");\n\
        modal.style.display = \"block\";\n\
        var xhr = new XMLHttpRequest();\n\
        xhr.open(\"GET\", \"https://iotdemos.scriptrapps.io/predixbasicdemo/parking\");\n\
        xhr.onload = function() {\n\
\n\
          var httpResponse = JSON.parse(xhr.responseText);\n\
          var httpResponse = JSON.parse(xhr.responseText);\n\
          console.log(httpResponse);\n\
          if (httpResponse.response.metadata && httpResponse.response.metadata.errorCode) {

alert("An error occurred " + httpResponse.response.metadata.errorDetail);
console.log(httpResponse.response.metadata);\n\
var loadingDiv = document.getElementById("loadingMsg");
if (loadingDiv) {
  loadingDiv.style.display = "none";
}
}else {
  placeMarkers(httpResponse.response.result);
}
};\n\
\n\
xhr.onerror = function(error) {\n\
  \n\
          if (typeof(error) == \"object\") {\n\
            alert(JSON.stringify(error));\n\
          }else{\n\
            alert(error);\n\
          }\n\
        };\n\
        \n\
        xhr.send();\n\
      }\n\
	</script>\n\
  </head>\n\
  <body onload=\"getParkingStatus()\">\n\
    <div id=\"map\"></div>\n\
    <script>\n\
      \n\
	  var map = null;\n\
      function initMap() {\n\
        map = new google.maps.Map(document.getElementById(\'map\'), {\n\
          center: {lat: 32.711526, lng: -117.157659}, \n\
          zoom: 18\n\
        });\n\
      }\n\
    </script>\n\
	<script src=\"https://maps.googleapis.com/maps/api/js?key=AIzaSyBT2lgr9B0CzZSipJK9XSGllkfTUXICbQw&callback=initMap&libraries=drawing\" async defer></script>\n\
	<div id=\"loadingMsg\" class=\"modal\">\n\
       <div class=\"modal-content\">         \n\
         <p>Searching for available parkings. Please wait...</p>\n\
       </div>\n\
    </div>\n\
  </body>\n\
</html>';  response.write(content);response.close();
