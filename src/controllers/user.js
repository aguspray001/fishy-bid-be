const { sign } = require("../helpers/jwtHandler");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt")
const userSchema = require("../models/user");

exports.userLogin = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Invalid Value");
    err.errorStatus = 400;
    err.data = error.array(); //from validationResult
    throw err;
  }
  let user = await userSchema.findOne({email: req.body.email})
  if(user){
    let checkPassword = bcrypt.compareSync(req.body.password, user.password)
        if (checkPassword) {
          const token = sign({user});
          res.status(200).json({
            message: "Login Sucess!",
            token: token,
            verified_user: user.image?1:0
          });
        }
        else{
          res.status(401).json({
            message: "Wrong password!",
          });
        }
        next();
  }else{
    res.status(404).json({message:"user not found!"})
    next();
  }
};

exports.userRegister = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const err = new Error("Invalid Value");
    err.errorStatus = 400;
    err.data = error.array(); //from validationResult
    throw err;
  }
  if (!req.file) {
    const err = new Error("Image is required!");
    err.errorStatus = 422; //error status
    throw err;
  }
  //   menerima request
  const name = req.body.name;
  const image = req.file.path;
  const email = req.body.email;
  const password = req.body.password;

  //membuat variable posting yang memanggil model untuk diberi nilai request (title, body, dan author yg dummy)
  const data = new userSchema({
    name: name,
    image: image,
    email: email,
    password: password,
  });

  //untuk menyimpan data ke database mongodb
  data
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Register Success",
        data: result,
      });
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};
