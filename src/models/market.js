const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

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
    itemId : [{
      type: ObjectId,
      ref: 'item'
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("market", MarketSchema); //('nama model', format model)
