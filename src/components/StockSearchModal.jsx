import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StockSearchModal = ({ show, onClose }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "FY9I3OEW0FZBWH1J"; 

  // 🔍 Fetch symbol suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${apiKey}`
        );
        const data = await res.json();
        console.log("API SUGGESTION RESULT:", data); // ✅ DEBUG LINE
        setSuggestions(data.bestMatches || []);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    };
  
    const timeout = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(timeout);
  }, [query]);


  // 📈 Fetch stock data
  const fetchStockQuote = async (symbol) => {
    setError("");
    setStockData(null);
    try {
      const res = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
      );
      const data = await res.json();
      const quote = data["Global Quote"];

      if (!quote || Object.keys(quote).length === 0) {
        setError("No valid stock data found. Check symbol or API limits.");
        return;
      }

      setStockData({
        symbol: quote["01. symbol"],
        name: quote["01. symbol"],
        price: parseFloat(quote["05. price"]),
        change_percent: parseFloat(quote["10. change percent"]),
      });

      setSuggestions([]);
      setQuery("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch quote.");
    }
  };

  // 🧩 Add to watchlist
  const addToWatchlist = () => {
    const existing = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const updated = [...existing, stockData].filter(
      (item, index, self) =>
        index === self.findIndex((s) => s.symbol === item.symbol)
    );
    localStorage.setItem("watchlist", JSON.stringify(updated));
  
    // Track top watchlisted
    const stats = JSON.parse(localStorage.getItem("topWatchlisted") || "{}");
    const symbol = stockData.symbol;
    stats[symbol] = (stats[symbol] || 0) + 1;
    localStorage.setItem("topWatchlisted", JSON.stringify(stats));
  
    onClose(); // Close modal
  };

  if (!show) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[1000]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md relative"
      >
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
          🔍 Search Stock
        </h2>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type stock name or symbol (e.g., Apple, AAPL)"
          className="w-full px-4 py-2 border rounded mb-2 text-black"
        />

        {/* 🧠 Suggestion dropdown */}
        {suggestions.length > 0 && (
          <ul className="bg-white border max-h-48 overflow-y-auto rounded shadow text-sm mb-4 z-50">
            {suggestions.map((match) => (
              <li
                key={match["1. symbol"]}
                onClick={() => fetchStockQuote(match["1. symbol"])}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-black"
              >
                {match["1. symbol"]} – {match["2. name"]}
              </li>
            ))}
          </ul>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* ✅ Display stock data */}
        {stockData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gray-100 dark:bg-gray-800 rounded mt-2"
          >
            <h3 className="text-lg font-bold text-black dark:text-white">
              {stockData.name} ({stockData.symbol})
            </h3>
            <p className="text-sm text-black dark:text-white">
              Price: ${stockData.price.toFixed(2)} <br />
              Change:{" "}
              <span
                className={
                  stockData.change_percent >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {stockData.change_percent.toFixed(2)}%
              </span>
            </p>
            <button
              onClick={addToWatchlist}
              className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              ➕ Add to Watchlist
            </button>
          </motion.div>
        )}

        {/* ❌ Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black dark:text-white"
        >
          ✖
        </button>
      </motion.div>
    </motion.div>
  );
};

export default StockSearchModal;
