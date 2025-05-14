import { useState } from "react";

const StockQuote = () => {
  const [symbol, setSymbol] = useState("");
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    if (!symbol.trim()) return;

    setLoading(true);
    setError("");
    setQuote(null);

    const apiKey = import.meta.env.VITE_ALPHAVANTAGE_API_KEY;
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol.trim().toUpperCase()}&apikey=${apiKey}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const result = data["Global Quote"];

      if (!result || !result["05. price"]) {
        setError("Symbol not found or API limit reached.");
      } else {
        setQuote(result);
      }
    } catch (err) {
      setError("Failed to fetch stock data.");
    } finally {
      setLoading(false);
    }
  };

  const isMarketOpen = () => {
    if (!quote) return false;
    const latestDay = quote["07. latest trading day"];
    const today = new Date().toISOString().split("T")[0];
    return latestDay === today;
  };

  return (
    <div className="p-6 bg-gray-950 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">📊 Live Stock Lookup</h2>

      <div className="flex justify-center gap-4 mb-8">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter symbol (e.g. TSLA)"
          className="px-4 py-2 rounded-md text-black w-64 focus:outline-none focus:ring-2 ring-cyan-500"
        />
        <button
          onClick={fetchQuote}
          className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-md text-white"
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {error && <p className="text-center text-red-400">{error}</p>}

      {quote && (
        <div className="max-w-md mx-auto bg-gray-800 rounded-xl p-6 shadow-md text-center">
          <h3 className="text-2xl font-semibold mb-2">
            {quote["01. symbol"]}
          </h3>
          <p className="text-lg">
            💵 <span className="font-bold">${parseFloat(quote["05. price"]).toFixed(2)}</span>
          </p>
          <p
            className={`mt-1 text-sm ${
              parseFloat(quote["09. change"]) >= 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {quote["10. change percent"]} ({quote["09. change"]})
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Market Status:{" "}
            <span className={isMarketOpen() ? "text-green-400" : "text-red-400"}>
              {isMarketOpen() ? "Open" : "Closed"}
            </span>
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Last updated: {quote["07. latest trading day"]}
          </p>
        </div>
      )}
    </div>
  );
};

export default StockQuote;