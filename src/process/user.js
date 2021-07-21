const { sign } = require("../helpers/jwtHandler");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const userSchema = require("../models/user");

class userProcess {
  async login(req) {
    let user = await userSchema.findOne({ email: req.body.email });
    let checkPassword = await bcrypt.compareSync(req.body.password, user.password);
    if (checkPassword) {
      const data = {...user._doc,verified_user: user.image ? 1 : 0,}; // copy and add verified status if image is exist
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
}

module.exports = userProcess;
