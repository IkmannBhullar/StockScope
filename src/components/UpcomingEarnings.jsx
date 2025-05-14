import { useEffect, useState } from "react";
import { mockEarnings } from "../lib/mockEarnings";

const UpcomingEarnings = () => {
  const [earnings, setEarnings] = useState([]);

  useEffect(() => {
    async function fetchEarnings() {
      try {
        const res = await fetch(
          `https://finnhub.io/api/v1/calendar/earnings?from=2024-05-14&to=2024-05-20&token=${import.meta.env.VITE_FINNHUB_API_KEY}`
        );
        const data = await res.json();
        if (data.earningsCalendar?.length > 0) {
          setEarnings(data.earningsCalendar.slice(0, 6));
        } else {
          throw new Error("No earnings data");
        }
      } catch (err) {
        console.warn("Using mock earnings due to error:", err.message);
        setEarnings(mockEarnings);
      }
    }

    fetchEarnings();
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow text-white">
      <h3 className="text-2xl font-semibold mb-4">📅 Upcoming Earnings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {earnings.map((item, idx) => (
          <div
            key={item.symbol + idx}
            className="relative p-4 rounded-lg bg-gradient-to-br from-cyan-900/30 to-gray-900/40 border border-cyan-700/30 hover:scale-[1.015] transition-transform"
          >
            <div className="absolute top-1 right-2 text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
              {item.time}
            </div>
            <h4 className="text-lg font-bold text-cyan-300">{item.symbol}</h4>
            <p className="text-sm text-gray-300 mb-1">{item.name || "—"}</p>
            <p className="text-sm text-gray-400">
              Earnings Date:{" "}
              <span className="text-white font-medium">{item.date}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEarnings;