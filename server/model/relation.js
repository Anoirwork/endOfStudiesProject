const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const relationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    kid: {
      type: Schema.Types.ObjectId,
      ref: "Kid"
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("Relation", relationSchema);
