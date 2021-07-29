const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BidSchema = new Schema(
  {
    bidPrice: {
      type: Number,
      default: 0,
    },
    bidHistory:[],
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "item",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("bid", BidSchema); //('nama model', format model)
