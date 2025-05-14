// src/components/SectorStocksModal.jsx
import { useEffect, useState } from "react";

const SectorStocksModal = ({ sector, onClose }) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sector) return;

    async function fetchSectorStocks() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${import.meta.env.VITE_FINNHUB_API_KEY}`
        );
        const data = await res.json();
        const filtered = data.filter((item) =>
          item.finnhubIndustry?.toLowerCase().includes(sector.toLowerCase())
        );
        setStocks(filtered.slice(0, 10));
      } catch (err) {
        console.error("Error fetching stocks for sector:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSectorStocks();
  }, [sector]);

  if (!sector) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg max-w-2xl w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">📂 {sector} Stocks</h2>

        {loading ? (
          <p>Loading...</p>
        ) : stocks.length === 0 ? (
          <p>No stocks found for this sector.</p>
        ) : (
          <ul className="space-y-2">
            {stocks.map((stock) => (
              <li key={stock.symbol} className="border-b pb-2">
                <p className="font-semibold">{stock.description}</p>
                <p className="text-sm text-gray-400">{stock.symbol}</p>
                <a
                  href={`/quote?symbol=${stock.symbol}`}
                  className="text-cyan-400 hover:underline text-sm"
                >
                  View Quote →
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SectorStocksModal;