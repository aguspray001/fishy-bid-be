const path = require("path");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const ItemSchema = require("../models/item");
const MarketSchema = require("../models/market");
const fs = require("fs");

exports.addItem = async (req, res, next) => {
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
  await MarketSchema.findById(req.body.market_place)
  .then((r)=>{
    if(!r) throw new Error('Market is not found!')
    //menerima request
    const name = req.body.name;
    const jenis = req.body.jenis;
    const harga = req.body.harga;
    const status = req.body.status;
    const grade = req.body.grade;
    const image = req.file.path;
    const market_place = req.body.market_place;
  
    //membuat variable posting yang memanggil model untuk diberi nilai request (title, body, dan author yg dummy)
    const Posting = new ItemSchema({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      jenis: jenis,
      harga: harga,
      status: status,
      grade: grade,
      image: image,
      market_place: market_place
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
        next(err)
      });
  })
};

exports.getItemById = async (req, res, next) => {
  const id = req.params.itemId;
  await ItemSchema.findById(id)
    .then((r) => {
        console.log("item", r)
      if (!r) {
        const error = new Error("Item tidak ditemukan");
        error.errorStatus = 404;
        throw error;
      } else {
        res.status(200).json({
          message: "Item by id berhasil difetch",
          data: r,
        });
      }
    })
    .catch((err) => next(err));
};

const removeImage = (filePath) => {
  console.log("file path: ", filePath);
  console.log("dirname: ", __dirname);
  filePath = path.join(__dirname, "../..", filePath);
  console.log("join_dir: ", filePath);
  //menghapus dengan menggunakan filesystem
  fs.unlink(filePath, (err) => console.log(err));
};
