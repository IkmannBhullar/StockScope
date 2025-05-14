// src/components/SectorGrid.jsx
import { useEffect, useState } from "react";

const SectorGrid = ({ onSectorClick }) => {
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    async function fetchSectors() {
      try {
        const res = await fetch(
          `https://finnhub.io/api/v1/stock/sector-performance?token=${import.meta.env.VITE_FINNHUB_API_KEY}`
        );
        const data = await res.json();
        setSectors(data);
      } catch (err) {
        console.error("Error fetching sector data:", err);
      }
    }

    fetchSectors();
  }, []);

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">📊 Market Sectors</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {sectors.map((sector) => (
          <div
            key={sector.sector}
            className="bg-gray-800 p-4 rounded-lg text-white hover:bg-gray-700 cursor-pointer transition"
            onClick={() => onSectorClick(sector.sector)}
          >
            <h3 className="text-lg font-semibold">{sector.sector}</h3>
            <p
              className={`text-sm mt-1 ${
                parseFloat(sector.change) >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {parseFloat(sector.change).toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectorGrid;