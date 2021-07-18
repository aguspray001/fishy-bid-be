const { sign } = require("../helpers/jwtHandler");
const { validationResult } = require("express-validator");
const userSchema = require("../models/user");

exports.userLogin = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Invalid Value");
    err.errorStatus = 400;
    err.data = error.array(); //from validationResult
    throw err;
  }
  userSchema.findOne({
      email: req.body.email
  }).exec((err, user)=>{
      if(!user){
        return res.status(401).json({
            message: "your email is not registered"
        })
      };
      if(user){
          const email = req.body.email;
          const password = req.body.password;
          const token = sign({
            email: email,
            password: password,
          });
          res.status(200).json({
            message: "login sukses",
            token: token,
          });
      }
      next()
  })
};

exports.userRegister = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const err = new Error("Invalid Value");
    err.errorStatus = 400;
    err.data = error.array(); //from validationResult
    throw err;
  }

  //mengecek request file
  console.log(req.file);
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
