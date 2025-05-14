import { useEffect, useState } from "react";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(saved);
  }, []);

  const handleRemove = (symbol) => {
    const updated = watchlist.filter((item) => item.symbol !== symbol);
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-950 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">📈 My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p className="text-center text-gray-400">
          No stocks in your watchlist yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlist.map((stock) => (
            <div
              key={stock.symbol}
              className="bg-gray-800 p-4 rounded-xl shadow-md flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{stock.symbol}</h2>
                <p className="text-gray-300 text-sm">{stock.name}</p>
                <p
                  className={`text-sm mt-1 ${
                    stock.change_percent < 0 ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {stock.change_percent?.toFixed(2)}%
                </p>
                <p className="text-white text-md">
                  ${stock.price?.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => handleRemove(stock.symbol)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;