const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    createdAt:{type:Date, default:Date.now},
    name:{type:String, required:false},
    image:{type:String},
    email:{type:String, required:false},
    password:{type:String, required:false},
    verifyCode : {type:Number, default:0},
    verifyReason : {type:String},
    deletedAt:{type:Date, default:0}
  },
);

// hash user password before save to the database
userSchema.pre('save', function(next){
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
  });

module.exports = mongoose.model("user", userSchema); //('nama model', format model)
