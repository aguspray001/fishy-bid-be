const express = require("express");
const router = express.Router();

const itemController = require("../controllers/item");
const { jwtAuth } = require("../helpers/jwtAuth");

router.post("/add", jwtAuth, itemController.addItem);
router.get("/:itemId", jwtAuth, itemController.getItemById);

module.exports = router;
