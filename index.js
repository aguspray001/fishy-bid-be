const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const dotenv = require('dotenv');
const cors = require('cors');
const { errorHandler } = require("./src/helpers/errorHandler");

// routes
const marketRoutes = require('./src/routes/market');
const userRoutes = require('./src/routes/user');
const itemRoutes = require('./src/routes/item');

// init
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3001;
const connectionOptions = {useCreateIndex:true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false}


const fileStrorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); //cb(error, nama folder yang diakses)
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname); //cb(error, nama file)
  },
});

//filter extension file
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
app.use(cors())

// calling routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/market", marketRoutes);
app.use("/api/v1/item", itemRoutes);



// handling global error
app.use(errorHandler);

// mongoose connection
mongoose
  .connect(
    process.env.MONGODB_URI,
    connectionOptions
  )
  .then(() => {
    app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
  })
  .catch((err) => console.log(err));
