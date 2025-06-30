import { useEffect, useState } from "react";
import {
  Leaf,
  BarChart3,
  MapPin,
  TrendingUp,
  Users,
  Globe,
  ArrowRight,
  Check,
  Star,
} from "lucide-react";
//import RecommendationForm from "./RecommendationForm";
// Mock data for demonstration
const marketData = [
  {
    location: "Mumbai",
    product: "Tomatoes",
    price: 45,
    demand: "High",
    supply: "Low",
    deficit: 15,
  },
  {
    location: "Pimpri",
    product: "Onions",
    price: 35,
    demand: "Medium",
    supply: "High",
    deficit: -5,
  },
  {
    location: "Kolhapur",
    product: "Potatoes",
    price: 28,
    demand: "High",
    supply: "Medium",
    deficit: 8,
  },
  {
    location: "Solapur",
    product: "Carrots",
    price: 52,
    demand: "Low",
    supply: "Low",
    deficit: 2,
  },
  {
    location: "Nashik",
    product: "Cabbage",
    price: 22,
    demand: "High",
    supply: "Medium",
    deficit: 12,
  },
];

const recommendations = [
  {
    location: "Mumbai",
    product: "Tomatoes",
    expectedPrice: 48,
    profitPotential: "High",
    distance: "120 km",
  },
  {
    location: "Pune",
    product: "Onions",
    expectedPrice: 38,
    profitPotential: "Medium",
    distance: "85 km",
  },
  {
    location: "Bangalore",
    product: "Potatoes",
    expectedPrice: 32,
    profitPotential: "High",
    distance: "200 km",
  },
];

const Page = {
  LANDING: "landing",
  DASHBOARD: "dashboard",
  PRODUCER: "producer",
  ANALYTICS: "analytics",
} as const;

type PageType = (typeof Page)[keyof typeof Page];

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>(Page.LANDING);
  const renderNavigation = () => (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Leaf className="h-8 w-8 text-emerald-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                AgriOptimize
              </span>
            </div>
          </div>
          <div className="flex space-x-8">
            <button
              onClick={() => setCurrentPage(Page.LANDING)}
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                currentPage === Page.LANDING
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Home
            </button>
            {
              <button
                onClick={() => setCurrentPage(Page.DASHBOARD)}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  currentPage === Page.DASHBOARD
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Market Dashboard
              </button>
            }
            <button
              onClick={() => setCurrentPage(Page.PRODUCER)}
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                currentPage === Page.PRODUCER
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Producer Tools
            </button>
            <button
              onClick={() => setCurrentPage(Page.ANALYTICS)}
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                currentPage === Page.ANALYTICS
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Analytics
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const renderLandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative pt-16 pb-32 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Optimize Food
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                {" "}
                Distribution
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect producers with optimal markets while minimizing regional
              food deficits. Our AI-powered platform analyzes real-time supply,
              demand, and pricing data across locations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentPage(Page.DASHBOARD)}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Explore Markets <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentPage(Page.PRODUCER)}
                className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-emerald-600"
              >
                For Producers
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to optimize food distribution
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <BarChart3 className="h-12 w-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Real-time Market Data
              </h3>
              <p className="text-gray-600">
                Track prices, availability, and demand across multiple locations
                in real-time.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <MapPin className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Location Optimization
              </h3>
              <p className="text-gray-600">
                Find the best markets to sell your produce based on distance and
                profit potential.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <TrendingUp className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Deficit Analysis
              </h3>
              <p className="text-gray-600">
                Identify and minimize food shortages across different regions
                automatically.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">2,500+</div>
              <div className="text-emerald-100">Active Producers</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-emerald-100">Market Locations</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">30%</div>
              <div className="text-emerald-100">Waste Reduction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Market Dashboard
          </h1>
          <p className="text-gray-600">
            Real-time market conditions across regions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* ...your stats cards... */}
        </div>

        {/* Market Data Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              Current Market Conditions
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Demand
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supply
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deficit
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {marketData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{item.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item.demand === "High"
                            ? "bg-red-100 text-red-800"
                            : item.demand === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {item.demand}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item.supply === "High"
                            ? "bg-green-100 text-green-800"
                            : item.supply === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.supply}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span
                        className={
                          item.deficit > 0 ? "text-red-600" : "text-green-600"
                        }
                      >
                        {item.deficit > 0 ? "+" : ""}
                        {item.deficit}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const [mileage, setMileage] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocation] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [maxDistance, setMaxDistance] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiRecommendations, setApiRecommendations] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState("");

  const handleFindMarkets = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location,
          latitude,
          longitude,
          product,
          quantity,
          maxDistance,
          mileage,
          date,
        }),
      });
      if (!res.ok) throw new Error("Failed to fetch recommendations");
      const data = await res.json();
      if (data) console.log("API Recommendations:", data.recommendations);
      setApiRecommendations(data.recommendations || []);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  function LocationForm({
    latitude,
    longitude,
    setLatitude,
    setLongitude,
  }: {
    latitude: string;
    longitude: string;
    setLatitude: (lat: string) => void;
    setLongitude: (lng: string) => void;
  }) {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude.toString());
            setLongitude(position.coords.longitude.toString());
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    return (
      <div>
        <button
          type="button"
          className="w-full px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200"
          onClick={getLocation}
        >
          Get Current Location
        </button>
        <form>
          <label>Latitude:</label>
          <input
            className="px-4 py-1 rounded-lg"
            type="text"
            value={latitude}
            readOnly
          />
          <label>Longitude:</label>
          <input
            className="px-4 py-1 rounded-lg"
            type="text"
            value={longitude}
            readOnly
          />
        </form>
      </div>
    );
  }

  //  export default LocationForm;

  const renderProducerTools = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Producer Tools
          </h1>
          <p className="text-gray-600">
            Find the best markets for your produce
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <form className="space-y-4" onSubmit={handleFindMarkets}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Location
              </label>{" "}
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <LocationForm
              latitude={latitude}
              longitude={longitude}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Type
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
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
                Quantity (quintals)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Distance (km)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Maximum travel distance"
                value={maxDistance}
                onChange={(e) => setMaxDistance(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mileage (kmpl)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Mileage"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Sale
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200"
              disabled={loading}
            >
              {loading ? "Finding..." : "Find Best Markets"}
            </button>
            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          </form>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Recommended Markets
            </h2>
            <div className="space-y-4">
              {(apiRecommendations.length > 0
                ? apiRecommendations
                : recommendations
              )
                .filter(
                  (rec) =>
                    rec &&
                    (rec.market_name || rec.location) &&
                    (rec.predicted_price !== undefined ||
                      rec.expectedPrice !== undefined)
                )
                .sort((a, b) => {
                  // Calculate revenue for each recommendation
                  const getRevenue = (rec: any) =>
                    rec.revenue !== undefined
                      ? Number(rec.revenue)
                      : rec.predicted_price !== undefined && quantity
                      ? rec.predicted_price * Number(quantity) * 100
                      : rec.expectedPrice !== undefined && quantity
                      ? rec.expectedPrice * Number(quantity) * 100
                      : 0;
                  return getRevenue(b) - getRevenue(a);
                })
                .map((rec, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    data-recommendation={JSON.stringify(rec)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {/* Show API field or fallback */}
                        {rec.location || rec.market_name}
                      </h3>
                      {/* Show rating if present, else profitPotential */}
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          rec.profitPotential === "High" || rec.rating >= 4
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {rec.profitPotential
                          ? `${rec.profitPotential} Profit`
                          : rec.rating
                          ? `Rating: ${rec.rating}`
                          : ""}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        Revenue:{" "}
                        {rec.revenue !== undefined
                          ? `₹${rec.revenue}`
                          : rec.predicted_price !== undefined && quantity
                          ? `₹${(
                              rec.predicted_price *
                              Number(quantity) *
                              100
                            ).toFixed(2)}`
                          : rec.expectedPrice !== undefined && quantity
                          ? `₹${(
                              rec.expectedPrice *
                              Number(quantity) *
                              100
                            ).toFixed(2)}`
                          : "-"}
                      </div>
                      <div>
                        Distance:{" "}
                        {rec.distance !== undefined
                          ? typeof rec.distance === "number"
                            ? `${rec.distance} km`
                            : rec.distance
                          : "-"}
                      </div>
                      <div>
                        {/* Show expectedPrice or predicted_price */}
                        Expected Price: ₹
                        {rec.expectedPrice !== undefined
                          ? rec.expectedPrice
                          : rec.predicted_price !== undefined
                          ? rec.predicted_price
                          : "-"}
                        /kg
                      </div>
                      <div>
                        {/* Show market fees if present */}
                        {rec.market_fees !== undefined && (
                          <>Market Fees: ₹{rec.market_fees}</>
                        )}
                      </div>
                      <div className="text-emerald-600 font-semibold col-span-2">
                        Recommended ✓
                      </div>
                      <div className="w-full px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200">
                        <button
                          type="button"
                          className="w-full bg-transparent border-none text-white font-semibold"
                          onClick={() =>
                            alert(`Sell ${product} at ${rec.market_name}`)
                          }
                        >
                          Sell
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Why Choose AgriOptimize?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <Check className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Maximize Profits</h3>
                <p className="text-emerald-100">
                  Find markets with highest demand and best prices for your
                  produce.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Check className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Reduce Waste</h3>
                <p className="text-emerald-100">
                  Optimize distribution to minimize food waste and spoilage.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Check className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Real-time Data</h3>
                <p className="text-emerald-100">
                  Make informed decisions with up-to-date market information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Supply-Demand Analytics
          </h1>
          <p className="text-gray-600">
            Comprehensive insights into food distribution patterns
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                68%
              </div>
              <div className="text-sm text-gray-600">Market Efficiency</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">₹2.4M</div>
              <div className="text-sm text-gray-600">Total Trade Volume</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">15%</div>
              <div className="text-sm text-gray-600">Waste Reduction</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                1,247
              </div>
              <div className="text-sm text-gray-600">Active Trades</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Regional Deficit Analysis */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Regional Deficit Analysis
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">
                    Mumbai - Tomatoes
                  </div>
                  <div className="text-sm text-gray-600">Critical shortage</div>
                </div>
                <div className="text-red-600 font-bold">-15 tons</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">
                    Kolkata - Cabbage
                  </div>
                  <div className="text-sm text-gray-600">Moderate shortage</div>
                </div>
                <div className="text-yellow-600 font-bold">-12 tons</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">
                    Bangalore - Potatoes
                  </div>
                  <div className="text-sm text-gray-600">Minor shortage</div>
                </div>
                <div className="text-orange-600 font-bold">-8 tons</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">
                    Delhi - Onions
                  </div>
                  <div className="text-sm text-gray-600">Surplus available</div>
                </div>
                <div className="text-green-600 font-bold">+5 tons</div>
              </div>
            </div>
          </div>

          {/* Price Trends */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Price Trend Analysis
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-emerald-500 pl-4">
                <div className="font-medium text-gray-900">Tomatoes</div>
                <div className="text-sm text-gray-600">Average: ₹42/kg</div>
                <div className="text-emerald-600 text-sm">↗ +8% this week</div>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="font-medium text-gray-900">Onions</div>
                <div className="text-sm text-gray-600">Average: ₹35/kg</div>
                <div className="text-blue-600 text-sm">→ Stable</div>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <div className="font-medium text-gray-900">Potatoes</div>
                <div className="text-sm text-gray-600">Average: ₹28/kg</div>
                <div className="text-red-600 text-sm">↘ -3% this week</div>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <div className="font-medium text-gray-900">Carrots</div>
                <div className="text-sm text-gray-600">Average: ₹52/kg</div>
                <div className="text-emerald-600 text-sm">↗ +12% this week</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Panel */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            AI-Powered Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h3 className="font-semibold mb-2">Immediate Actions</h3>
              <ul className="space-y-1 text-sm">
                <li>• Redirect 10 tons of tomatoes from Delhi to Mumbai</li>
                <li>• Increase potato procurement in Karnataka</li>
                <li>• Alert producers about carrot price surge</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h3 className="font-semibold mb-2">Long-term Strategy</h3>
              <ul className="space-y-1 text-sm">
                <li>• Develop cold storage in high-deficit regions</li>
                <li>• Improve transportation links to remote markets</li>
                <li>• Encourage crop diversification programs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {currentPage !== Page.LANDING && renderNavigation()}

      {currentPage === Page.LANDING && renderLandingPage()}
      {currentPage === Page.DASHBOARD && renderDashboard()}
      {currentPage === Page.PRODUCER && renderProducerTools()}
      {currentPage === Page.ANALYTICS && renderAnalytics()}
    </div>
  );
}

export default App;
