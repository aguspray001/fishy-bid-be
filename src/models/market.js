const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MarketPost = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
    items: {
      type: Object,
      default:null
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MarketPost", MarketPost); //('nama model', format model)
