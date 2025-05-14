// src/components/GlobalMarkets.jsx
import { useEffect, useState } from "react";

const indices = [
  { name: "NASDAQ", symbol: "^IXIC" },
  { name: "S&P 500", symbol: "^GSPC" },
  { name: "Dow Jones", symbol: "^DJI" },
  { name: "Bitcoin", symbol: "BINANCE:BTCUSDT" },
  { name: "Ethereum", symbol: "BINANCE:ETHUSDT" },
];

const GlobalMarkets = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchGlobalMarkets() {
      try {
        const results = await Promise.all(
          indices.map(async (index) => {
            const res = await fetch(
              `https://finnhub.io/api/v1/quote?symbol=${index.symbol}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`
            );
            const json = await res.json();
            return {
              name: index.name,
              symbol: index.symbol,
              price: json.c,
              change: json.dp,
            };
          })
        );
        setData(results);
      } catch (err) {
        console.error("Error fetching global market data:", err);
      }
    }

    fetchGlobalMarkets();
  }, []);

  return (
    <section className="bg-gray-800 p-6 rounded-xl shadow text-white">
      <h3 className="text-xl font-semibold mb-4">🌍 Global Markets</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((item) => (
          <div
            key={item.symbol}
            className="bg-gray-900 p-4 rounded-lg shadow text-center"
          >
            <h4 className="text-lg font-bold">{item.name}</h4>
            <p className="text-sm text-gray-400">{item.symbol}</p>
            <p className="text-white text-xl mt-2">${item.price?.toFixed(2)}</p>
            <p
              className={`text-sm font-semibold ${
                item.change >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {item.change?.toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GlobalMarkets;