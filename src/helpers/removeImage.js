const path = require("path");
const fs = require("fs");

exports.removeImage = (filePath) => {
    filePath = path.join(__dirname, "../..", filePath);
    //menghapus dengan menggunakan filesystem
    fs.unlink(filePath, (err) => console.log(err));
  };