const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const marketController = require("../controllers/market");
const { jwtAuth } = require("../helpers/jwtAuth");

router.post("/add", jwtAuth, marketController.addMarket);
router.get("/", jwtAuth, marketController.getAllMarket);
router.get("/:marketId", jwtAuth, marketController.getMarketById);
router.put("/:marketId", jwtAuth, marketController.updateMarket);
router.delete("/:marketId", jwtAuth, marketController.deleteMarket);

module.exports = router;
