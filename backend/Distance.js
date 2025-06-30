import marketData from "../backend/data/markets.json" assert { type: "json" }; // Adjust path as needed

// Haversine formula to calculate distance between two lat/lng pairs
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.asin(Math.sqrt(a));
}

// Main function to generate user-specific market data with distance
export function dist_data(userLat, userLng) {
  console.log("dist_data called with:", userLat, userLng);
  const result = marketData.map((market) => {
    const distance = haversineDistance(
      userLat,
      userLng,
      market.lat,
      market.lng
    );

    return {
      ...market, // spread original market data
      distance: parseFloat(distance.toFixed(2)), // add distance (rounded to 2 decimals)
    };
  });

  return result; // This is your "temporary per-user JSON object"
}
