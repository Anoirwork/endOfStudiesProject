var socket = io("http://172.20.10.8:4500/");
function myTimer() {
  var d = new Date();
  var t = d.toLocaleTimeString();
  document.getElementById("demo").innerHTML = t;

  socket.emit("msg", object);
}
var myVar = setInterval(myTimer, 1000);

///////////////////////////////////////////////////////////////////////////////

var x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

var watchID;
var geoLoc;
let object = {};

function showLocation(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  object = { lat: latitude, lng: longitude };
  console.log(object);
}

function errorHandler(err) {
  if (err.code == 1) {
    console.log("Error: Access is denied!");
  } else if (err.code == 2) {
    console.log("Error: Position is unavailable!");
  }
}

function getLocationUpdate() {
  if (navigator.geolocation) {
    geoLoc = navigator.geolocation;
    watchID = geoLoc.watchPosition(showLocation, errorHandler, options);
  } else {
    console.log("sry");
  }
}

var socket = io("http://172.20.10.8:4500/");
function myTimer() {
  var d = new Date();
  var t = d.toLocaleTimeString();
  document.getElementById("demo").innerHTML = t;
  getLocationUpdate();
  socket.emit("msg", object.toString());
}
var myVar = setInterval(myTimer, 1000);
