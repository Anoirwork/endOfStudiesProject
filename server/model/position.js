const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const positionSchema = new Schema({
  lat: {
    type: String,
    required: true
  },
  lng: {
    type: String,
    required: true
  },
  currentTime: {
    type: Date,
    required: true
  },
  kidNumb: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Position", positionSchema);
