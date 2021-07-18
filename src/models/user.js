const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    createdAt:{type:Date, default:Date.now},
    name:{type:String, required:false},
    image:{type:String, required:true},
    email:{type:String, required:false},
    password:{type:String, required:false},
    deletedAt:{type:Number, default:0}
  },
);

module.exports = mongoose.model("userSchema", userSchema); //('nama model', format model)
