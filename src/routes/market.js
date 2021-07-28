const express = require("express");
const router = express.Router();

const marketController = require("../controllers/market");
const { uploadSingle } = require("../helpers/fileHandler");
const { jwtAuth } = require("../helpers/jwtAuth");

router.post("/create", jwtAuth, uploadSingle, marketController.addMarket);
router.get("/", jwtAuth, marketController.getAllMarket);
router.get("/:marketId", jwtAuth, marketController.getMarketById);
router.put("/:marketId", jwtAuth, marketController.updateMarket);
router.delete("/:marketId", jwtAuth, marketController.deleteMarket);

module.exports = router;
