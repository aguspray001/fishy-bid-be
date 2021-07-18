const path = require("path");
const { validationResult } = require("express-validator");
const MarketPost = require("../models/market");
const fs = require("fs");

exports.addMarket = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Invalid Value");
    err.errorStatus = 400;
    err.data = error.array(); //from validationResult
    throw err;
  }

  //mengecek request file

  if (!req.file) {
    const err = new Error("Image harus diupload");
    err.errorStatus = 422; //error status
    throw err;
  }

  //menerima request
  const name = req.body.name;
  const location = req.body.location;
  const image = req.file.path;
  const items = req.body.items;

  //membuat variable posting yang memanggil model untuk diberi nilai request (title, body, dan author yg dummy)
  const Posting = new MarketPost({
    name: name,
    location: location,
    image: image,
    items: items,
  });

  //untuk menyimpan data ke database mongodb
  Posting.save()
    .then((result) => {
      res.status(201).json({
        message: "Add Market Success",
        data: result,
      });
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

exports.getMarketById = (req, res, next) =>{
    const id = req.params.marketId;
    MarketPost.findById(id)
    .then((r)=>{
        if(!r){
            const error = new Error("Market tidak ditemukan");
            error.errorStatus = 404;
            throw error;
        }else{
            res.status(200).json({
                message:"Data berhasil di-fetch",
                data:r
            });
        }
    }).catch((err)=>next(err))
}
