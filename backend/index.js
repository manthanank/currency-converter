const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import routes
const exchangeRateRoutes = require("./routes/exchangeRateRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", exchangeRateRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the Exchange Rate API!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});
