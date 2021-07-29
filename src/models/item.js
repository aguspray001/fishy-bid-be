const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    price: {
      type: Number,
    },
    grade: {
        type: String,
    },
    status: {
        type: Number,
        default:0
    },
    image: [{
        type: String,
    }],
    marketId:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: "market"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("item", ItemSchema); //('nama model', format model)
