const express = require("express");
const router = express.Router();

const bidController = require("../controllers/bid");
const { jwtAuth } = require("../helpers/jwtAuth");

router.post("/:userId/:itemId", jwtAuth, bidController.bidItem);
module.exports = router;
