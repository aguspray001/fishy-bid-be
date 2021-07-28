const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const { uploadSingle } = require("../helpers/fileHandler");

router.post("/login", userController.userLogin);
router.post("/register", uploadSingle, userController.userRegister);
router.post("/verify/:userId", userController.userVerify);
router.post("/email-verify/:uniqueString", userController.emailVerify);
router.post("/reject/:userId", userController.userReject);

module.exports = router;
