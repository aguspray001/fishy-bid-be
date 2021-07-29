const express = require("express");
const bodyParser = require("body-parser");
var logger = require('morgan');
const cors = require('cors');
const path = require("path");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const http = require('http');
const socket = require('socket.io');

// error handler
const { errorHandler } = require("./src/helpers/errorHandler");

// routes
const marketRoutes = require('./src/routes/market');
const userRoutes = require('./src/routes/user');
const itemRoutes = require('./src/routes/item');
const bidRoutes = require('./src/routes/bid');

// init
dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app)
const io = socket(server, {
  cors : {
    origin : "*",
    methods : ["GET", "POST"]
  }
});

app.set('io', io)

// mongoose connection
const connectionOptions = {useCreateIndex:true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false}
mongoose.connect(process.env.MONGODB_URI, connectionOptions)

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

// morgan
app.use(logger('dev'));

// handling body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use("/images", express.static(path.join(__dirname, "images"))); //url static dimana images berada
app.use("/src/public/images",express.static(path.join(__dirname, '/src/public/images')));

// handling CORS
app.use(cors())

// calling routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/market", marketRoutes);
app.use("/api/v1/item", itemRoutes);
app.use("/api/v1/bid", bidRoutes);

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html');
})

// socket io start
var countdown = 1000;
setInterval(() => {
  countdown--;
  io.emit(`timer1`, { countdown: countdown });
}, 1000);

io.on("connection", (socket) => {
  socket.on("reset", (data) => {
    console.log('reset!')
    countdown = 1000;
    io.emit(`timer1`, { countdown: countdown });

  });
});
// socket io end


// handling global error
app.use(errorHandler);

// listen to port
server.listen(PORT, () => console.log(`Server listen on port ${PORT}`));

  
  
  