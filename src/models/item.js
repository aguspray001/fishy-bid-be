const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    jenis: {
      type: String,
      required: true,
    },
    harga: {
      type: Number,
      required: true,
    },
    grade: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    market_place:{
      type: mongoose.Schema.Types.ObjectId, ref: "market", required:true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("item", ItemSchema); //('nama model', format model)
