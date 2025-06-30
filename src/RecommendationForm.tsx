import { useState } from "react";

const RecommendationForm = () => {
  const [location, setLocation] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [maxDistance, setMaxDistance] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      location,
      product,
      quantity: Number(quantity),
      maxDistance: Number(maxDistance),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/recommendations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("Server response:", data);

      // handle response, maybe show results or notify user
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Get Recommendations
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Enter your location"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Type
          </label>
          <select
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          >
            <option value="">Select product</option>
            <option>Tomatoes</option>
            <option>Onions</option>
            <option>Potatoes</option>
            <option>Carrots</option>
            <option>Cabbage</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity (tons)
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Enter quantity"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Distance (km)
          </label>
          <input
            type="number"
            value={maxDistance}
            onChange={(e) => setMaxDistance(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Maximum travel distance"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200"
        >
          Find Best Markets
        </button>
      </form>
    </div>
  );
};

export default RecommendationForm;
