const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const kidSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  birthDay: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Kid", kidSchema);
