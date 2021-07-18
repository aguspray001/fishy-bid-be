const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const marketController = require('../controllers/market');
const { jwtAuth } = require("../helpers/jwtAuth");

//[POST] : /v1/blog/post <-- ini adalah endpoint
router.post(
  "/post",
  [
    body("name").isLength({ min: 5 }).withMessage("title tidak sesuai"),
    body("location").isLength({ min: 5 }).withMessage("body tidak sesuai"),
  ],
  marketController.addMarket
);

router.get("/:marketId", jwtAuth ,marketController.getMarketById);

module.exports = router;
