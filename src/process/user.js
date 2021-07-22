const { sign } = require("../helpers/jwtHandler");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const userSchema = require("../models/user");

class userProcess {
  async login(req) {
    let user = await userSchema.findOne({ email: req.body.email });
    // console.log(user)
    let checkPassword = await bcrypt.compareSync(req.body.password, user.password);
    if (checkPassword) {
      const data = user._doc; // copy and add verified status if image is exist
      const token = sign(data);
      return {data: token}
    }else{
        const e = new Error()
        e.message = 'User not Found or Wrong Password!'
        e.name = 'Wrong Password'
        e.errorStatus = 404
        throw e; //throw untuk membuang error, return untuk data
    }
  }
  async register(data){
    const checkUser = await userSchema.findOne({email: data.email})
    if(!checkUser){
        const resp = await userSchema.create(data);
        return {data: resp}
    }if(checkUser){
        const e = new Error()
        e.message = 'Email has been registered!'
        e.name = 'Email is already exist'
        e.errorStatus = 500
        throw e; //throw untuk membuang error, return untuk data
    }
  }
  async verify(userId){
    await userSchema.findByIdAndUpdate(userId, {verifyCode:1, verifyReason:""})
    .then(r=>{
      if(r){
        return r
      }
    }).catch(er=>{
      if(er){
        const e = new Error()
        e.message = 'User with params id not found!'
        e.name = 'User id not found'
        e.errorStatus = 500
        throw e; //throw untuk membuang error, return untuk data
      } 
    })
  }
  async reject(body, userId){
    let reason = await this.reasonConvert(parseInt(body.reason_code))

    await userSchema.findByIdAndUpdate(userId, {verifyCode:2, verifyReason:reason})
    .then(r=>{
      if(r){
        return r
      }
    }).catch(er=>{
      if(er){
        const e = new Error()
        e.message = 'User with params id not found!'
        e.name = 'User id not found'
        e.errorStatus = 500
        throw e; //throw untuk membuang error, return untuk data
      } 
    })
  }

  reasonConvert(reason){
    switch (reason) {
      case 1:
        return "Foto Buram atau Tidak Jelas"
      case 2:
        return "Nama Tidak Sesuai dengan KTP / Kartu Identitas"
      default:
        return "";
    }
  }
}

module.exports = userProcess;
