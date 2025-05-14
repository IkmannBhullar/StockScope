import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Dashboard = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [quotes, setQuotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [marketStatus, setMarketStatus] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(saved);

    async function fetchData() {
      try {
        const results = {};
        for (const stock of saved) {
          const res = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`
          );
          const data = await res.json();
          results[stock.symbol] = data;
        }
        setQuotes(results);
      } catch (err) {
        console.error("Error fetching quotes:", err);
      } finally {
        setLoading(false);
      }
    }

    async function fetchMarketStatus() {
      try {
        const res = await fetch(
          `https://finnhub.io/api/v1/market/status?exchange=US&token=${import.meta.env.VITE_FINNHUB_API_KEY}`
        );
        const data = await res.json();
        setMarketStatus(data);
      } catch (err) {
        console.error("Error fetching market status:", err);
      }
    }

    fetchData();
    fetchMarketStatus();
  }, []);

  const totalStocks = watchlist.length;

  const biggestGainer = Object.entries(quotes).reduce((top, [symbol, data]) => {
    if (!top || (data.dp ?? -Infinity) > (top.dp ?? -Infinity)) {
      return { symbol, ...data };
    }
    return top;
  }, null);

  const chartData = {
    labels: ["Open", "High", "Low", "Current"],
    datasets: [
      {
        label: biggestGainer?.symbol || "Top Gainer",
        data: biggestGainer
          ? [biggestGainer.o, biggestGainer.h, biggestGainer.l, biggestGainer.c]
          : [],
        borderColor: "rgba(0, 255, 200, 0.8)",
        backgroundColor: "rgba(0, 255, 200, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen p-6 bg-gray-950 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Dashboard</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading live data...</p>
      ) : (
        <>
          {/* Market Status */}
          <div className="text-center mb-6">
            {marketStatus?.isOpen ? (
              <span className="text-green-400 text-lg font-semibold">
                🟢 U.S. Market is OPEN
              </span>
            ) : (
              <span className="text-red-400 text-lg font-semibold">
                🔴 U.S. Market is CLOSED
              </span>
            )}
          </div>

          {/* Overview + Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-800 p-4 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-2">📌 Overview</h2>
              <p>Total Stocks: {totalStocks}</p>
              {biggestGainer && (
                <p className="mt-2">
                  🏆 Top Gainer: <strong>{biggestGainer.symbol}</strong> (
                  {biggestGainer.dp?.toFixed(2)}%)
                </p>
              )}
            </div>

            {biggestGainer && (
              <div className="bg-gray-800 p-4 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-2">📈 Top Gainer Chart</h2>
                <Line data={chartData} />
              </div>
            )}
          </div>

          {/* Live Watchlist */}
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">🔍 Live Watchlist</h2>
            <ul className="space-y-2">
              {watchlist.map((stock) => {
                const quote = quotes[stock.symbol];
                return (
                  <li key={stock.symbol} className="flex justify-between">
                    <span>
                      {stock.symbol} - {stock.name}
                    </span>
                    <span
                      className={
                        quote.dp > 0 ? "text-green-400" : "text-red-400"
                      }
                    >
                      {quote.dp?.toFixed(2)}% | ${quote.c?.toFixed(2)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )} 
    </div>
  );
};

export default Dashboard;