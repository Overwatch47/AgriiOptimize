import express from "express";
import cors from "cors";
import { dist_data } from "./Distance.js";
import fs from "fs";
import path from "path";

//const nodeh = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/recommendations", async (req, res) => {
  const { latitude, longitude, product, quantity, maxDistance, mileage, date } =
    req.body;

  const parsedLat = parseFloat(latitude);
  const parsedLng = parseFloat(longitude);
  const parsedQty = parseFloat(quantity || 0);
  const parsedMaxDistance = parseFloat(maxDistance || 10000);
  const parsedMileage = parseFloat(mileage || 25);

  if (isNaN(parsedLat) || isNaN(parsedLng)) {
    return res.status(400).json({ error: "Invalid lat/lng" });
  }

  try {
    // Step 1: Get market data with distances
    const enrichedMarkets = dist_data(parsedLat, parsedLng);

    // Step 2: Load price forecast JSON
    const forecastPath = path.join(
      "forecast_json_all_markets_forecast.json"
      //`${product}`
    );
    const forecastRaw = fs.readFileSync(forecastPath, "utf-8");
    const forecastJson = JSON.parse(forecastRaw);

    const today = date || new Date().toISOString().split("T")[0];

    // Step 3: Combine data into recommendations
    const recommendations = enrichedMarkets
      .filter((market) => market.distance <= parsedMaxDistance)
      .map((market) => {
        const marketForecast = forecastJson.predictions.find(
          (entry) => entry.market === market.market_name
        );

        const todayForecast = marketForecast?.forecast.find(
          (f) => f.date === today
        );
        const predicted_price = todayForecast?.predicted_price || 0;

        const demand = market.demand[product.toLowerCase()] || 0;
        const travel_cost = (market.distance / parsedMileage) * 100; // Rs per litre assumption
        const revenue =
          predicted_price * (parsedQty * 100) -
          travel_cost -
          market.market_fees;
        console.log(
          `Market: ${market.market_name}, Predicted Price: ${predicted_price}, Demand: ${demand}, Travel Cost: ${travel_cost}, Revenue: ${revenue}`
        );
        let profitPotential = "Low";
        if (revenue > 800) profitPotential = "High";
        else if (revenue > 400) profitPotential = "Medium";
        console.log(
          `Market: ${market.market_name}, Revenue: ${revenue}, Profit Potential: ${profitPotential}`
        );
        return {
          market_name: market.market_name,
          predicted_price,
          distance: parseFloat(market.distance.toFixed(2)),
          rating: market.rating,
          market_fees: market.market_fees,
          demand: demand,
          estimated_revenue: parseFloat(revenue.toFixed(2)),
          profitPotential,
        };
      });

    res.json({ recommendations });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({
      error: "Failed to calculate recommendations",
      details: err.message,
    });
  }
});

// Start server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
