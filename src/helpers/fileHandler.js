var multer = require("multer");
const path = require("path");

const fileStrorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); //cb(error, nama folder yang diakses)
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname); //cb(error, nama file)
  },
});
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
exports.uploadSingle = multer({ storage: fileStrorage, fileFilter: fileFilter }).single("image")
exports.uploadMulti = multer({ storage: fileStrorage, fileFilter: fileFilter }).array("image", 10)