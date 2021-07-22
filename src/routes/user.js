const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.post("/login", userController.userLogin);
router.post("/register", userController.userRegister);
router.post("/verify/:userId", userController.userVerify);
router.post("/reject/:userId", userController.userReject);

module.exports = router;
