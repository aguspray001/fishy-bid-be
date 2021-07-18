const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const config = require('./config.json');
// routes
const marketRoutes = require('./src/routes/market');

// init
const app = express();
const PORT = process.env.PORT || 3001;
const connectionOptions = {useCreateIndex:true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:true}
// 
const fileStrorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); //cb(error, nama folder yang diakses)
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname); //cb(error, nama file)
  },
});

//untuk filter file, agar client hanya meng-upload extension yang diizinkan saja
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true); //cb(error, kondisi)
  } else {
    cb(null, false);
  }
};

// handling body parser
app.use(bodyParser.json());
// handling save image
app.use("/images", express.static(path.join(__dirname, "images"))); //url static dimana images berada
app.use(
  multer({ storage: fileStrorage, fileFilter: fileFilter }).single("image")
);
// handling CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// calling routes
app.use("/api/v1/market", marketRoutes);


// handling global error
app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
  
    res.status(status).json({ message: message, data: data });
    next();
  });

mongoose
  .connect(
    process.env.MONGODB_URI || config.connectionString,
    connectionOptions
  )
  .then(() => {
    app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
  })
  .catch((err) => console.log(err));
