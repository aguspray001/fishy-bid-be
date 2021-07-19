const path = require("path");
const { validationResult } = require("express-validator");
const MarketSchema = require("../models/market");
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
  const Posting = new MarketSchema({
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
    MarketSchema.findById(id)
    .then((r)=>{
        if(!r){
            const error = new Error("Market tidak ditemukan");
            error.errorStatus = 404;
            throw error;
        }else{
            res.status(200).json({
                message:"Market by id berhasil difetch",
                data:r
            });
        }
    }).catch((err)=>next(err))
}

exports.getAllMarket = async (req, res, next) => {
  const {email} = await req.user.user; //get data user from jwt verify binds data
  console.log(email)
  const currentPage = await req.query.page || 1;
  const limit = await req.query.limit || 5;
  let totalItems;

 await MarketSchema.find()
  .countDocuments()
  .then((count)=>{
    console.log(count)
    totalItems = count;
    return MarketSchema.find()
    .skip(parseInt(currentPage-1)*parseInt(limit))
    .limit(parseInt(limit))
  })
  .then((result)=>{
    res.status(200).json({
      message: 'Data Market is Successfully fetched',
      data : result,
      total : totalItems,
      limit : limit,
      page : currentPage
    })
  }).catch(err=>next(err))
  
}

exports.updateMarket = async (req, res, next) => {
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
  const marketId = req.params.marketId;

  MarketSchema.findById(marketId)
  .then((result)=>{
    if(!result){
      throw new Error("Data Market tidak ditemukan!");
    }else{
      const Posting = new MarketSchema({
        name: name,
        location: location,
        image: image,
        items: items,
      });
      // update data lama dengan data request baru
      result.name = name;
      result.location = location;
      result.image  = image;
      result.items = items
      //untuk menyimpan data ke database mongodb
      result.save()
        .then((result) => {
          res.status(201).json({
            message: "Update Market is Success!",
            data: result,
          });
        })
        .catch((err) => {
          next(err);
        });
    }
  })
}

exports.deleteMarket = async (req, res, next) => {
  const marketId = req.params.marketId;

  await MarketSchema.findById(marketId)
  .then((result)=>{
    if(!result){
      throw new Error('Data tidak ditemukan!');
    }else{
      removeImage(result.image);
      return MarketSchema.findByIdAndRemove(marketId);
    }
  }).then((result)=>{
    if(result){
      res.status(200).json({message:"Market berhasil dihapus!", data:result})
    }
  }).catch(err=>next(err))
}

const removeImage = (filePath) => {
  console.log("file path: ", filePath);
  console.log("dirname: ", __dirname);
  filePath = path.join(__dirname, "../..", filePath);
  console.log("join_dir: ", filePath);
  //menghapus dengan menggunakan filesystem
  fs.unlink(filePath, (err) => console.log(err));
};

