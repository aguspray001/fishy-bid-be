const express = require("express");
const app = express();

exports.requestHandler = async (req, res, next, callback) => {
  let jres = {
    error: 0,
    data: [],
    message: "",
    stack: "",
    erorrName: "",
  };
//cb will get value from methods return, then fill into jres.data
  callback().then(async r=>{
    jres.data = await r;
    res.json(jres);
  }).catch(e=>next(e)); 
};
