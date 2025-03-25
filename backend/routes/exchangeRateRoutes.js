const express = require("express");
const router = express.Router();
const exchangeRateController = require("../controllers/exchangeRateController");

// Exchange rates endpoint
router.get("/exchange-rates", exchangeRateController.getExchangeRates);

module.exports = router;