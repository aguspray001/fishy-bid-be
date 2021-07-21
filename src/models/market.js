const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MarketSchema = new Schema(
  {
    name: {
      type: String,
      required : true
    },
    location: {
      type: String,
      required : true
    },
    image: {
      type: String
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("market", MarketSchema); //('nama model', format model)
