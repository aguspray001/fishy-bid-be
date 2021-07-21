const express = require("express");
const router = express.Router();

const itemController = require("../controllers/item");
const { jwtAuth } = require("../helpers/jwtAuth");

router.post("/create", jwtAuth, itemController.addItem);
router.get("/:itemId", jwtAuth, itemController.getItemById);
router.get("/", jwtAuth, itemController.getAllItem);
module.exports = router;
