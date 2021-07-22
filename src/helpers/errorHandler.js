const express = require("express");
const app = express();

exports.errorHandler = async (error, req, res, next) => {

  let jres = {
    error: 0,
    data: [],
    message: "",
    stack: {},
    erorrName: "",
  };
  jres.error = error.errorStatus || 500;
  jres.message = error.message;
  jres.data = [];
  jres.stack = error.stack;
  jres.erorrName = error.name;

  res.json(jres);
  next();
};
