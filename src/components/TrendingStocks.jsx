import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const TrendingStocks = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const res = await fetch(
          `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${import.meta.env.VITE_FINNHUB_API_KEY}`
        );
        const data = await res.json();
        setStocks(data.slice(0, 12));
      } catch (err) {
        console.error("Error fetching trending stocks:", err);
      }
    }

    fetchTrending();
  }, []);

  const handleAddToWatchlist = (stock) => {
    const current = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const isAlreadyAdded = current.some((item) => item.symbol === stock.symbol);
    if (isAlreadyAdded) {
      toast.error(`${stock.symbol} is already in your watchlist.`);
      return;
    }

    const updated = [...current, { symbol: stock.symbol, name: stock.description }];
    localStorage.setItem("watchlist", JSON.stringify(updated));
    toast.success(`${stock.symbol} added to watchlist`);
  };

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Exploring Stocks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            className="relative bg-gray-800 text-white p-4 rounded-xl shadow transition-transform duration-300 transform hover:scale-[1.02] hover:shadow-2xl group"
          >
            <h3 className="text-lg font-semibold">{stock.description}</h3>
            <p className="text-sm text-gray-400">{stock.symbol}</p>
            <a
              href={`/quote?symbol=${stock.symbol}`}
              className="text-cyan-400 hover:underline text-sm mt-2 inline-block"
            >
              View Quote →
            </a>

            <button
              onClick={() => handleAddToWatchlist(stock)}
              className="absolute top-2 right-2 p-2 rounded-full bg-cyan-600 group-hover:scale-110 transition hover:bg-cyan-700 shadow-lg"
              title="Add to Watchlist"
            >
              <span className="text-white text-lg font-bold">＋</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingStocks;