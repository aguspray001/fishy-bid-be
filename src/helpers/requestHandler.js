const express = require("express");
const app = express();

exports.requestHandler = async (req, res, next, isFile, callback) => {
  let jres = {
    error: 0,
    data: [],
    message: "",
    stack: "",
    erorrName: "",
  };
  if(isFile === true){
      //mengecek request file
      if (!req.file) {
      const err = new Error("File harus diupload");
      err.errorStatus = 422; //error status
      next(err)
      }
  }
  try {
    jres.data = await callback(req.body);
    res.json(jres);
  } catch (error) {
    //   console.log(error)
    jres.error = error.errorStatus || 500;
    jres.message = error.message;
    jres.data = [];
    jres.stack = error.stack;
    jres.erorrName = error.name;
    res.json(jres);
  }

};
