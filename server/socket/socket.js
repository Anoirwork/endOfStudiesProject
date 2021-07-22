const ioRecepter = require("socket.io")(4500);
const Position = require("../model/position");
const ioEmitter = require('socket.io')(5000);

  var filter =  [
    {$match: {operationType: 'insert'}}
  ];

  const data = Position.watch(filter);

/// ------- Parent Sending requests to seee his kids position on map ------ ///
ioEmitter.on("connection", (socketE) => {
  console.log("a Parent connected"); 
  data.on('change', d => {
        console.log(d.fullDocument);
        socketE.emit("parent", d.fullDocument);
      });
    socketE.on("disconnect", () => {
      console.log("Parent disconnected");
      socketE.removeAllListeners();
    });
});

/// ------- Kid has connected and Emits his Geolocation informations ------ ///
ioRecepter.on("connection", (socketR) => {
  console.log("a kid connected");
  socketR.on("data", function(position) {
    let pos = new Position({
      lat: position.lat,
      lng: position.lng,
      currentTime: position.currentTime,
      kidNumb: position.kidNumb
    });
    pos
      .save()
      .then(res => {
        console.log({pos});
      })
      .catch(err => {
        console.log(err);
      });
  });
  socketR.on("disconnect", () => {
    console.log("Kid disconnected");
    socketR.removeAllListeners();
  });
});
