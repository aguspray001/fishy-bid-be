const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var logger = require('morgan');
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

app.use(logger('dev'));

// handling body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/images", express.static(path.join(__dirname, "images"))); //url static dimana images berada

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
