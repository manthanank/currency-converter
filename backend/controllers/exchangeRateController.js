const axios = require("axios");
const config = require("../config/config");

// API key from config
const API_KEY = config.EXCHANGE_RATE_API_KEY;

/**
 * Get latest exchange rates
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getExchangeRates = async (req, res) => {
  try {
    const baseCurrency = req.query.base || "USD";
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching exchange rates:", error.message);
    res.status(500).json({
      error: "Failed to fetch exchange rates",
      message: error.message,
    });
  }
};

module.exports = {
  getExchangeRates,
};
