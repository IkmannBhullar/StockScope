import { useEffect, useState } from "react";

const EarningsCalendar = () => {
  const [earnings, setEarnings] = useState([]);

  useEffect(() => {
    const fetchEarnings = async () => {
      const today = new Date();
      const from = today.toISOString().split("T")[0];
      const to = new Date(today.setDate(today.getDate() + 7)).toISOString().split("T")[0];

      try {
        const res = await fetch(
          `https://finnhub.io/api/v1/calendar/earnings?from=${from}&to=${to}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`
        );
        const data = await res.json();
        setEarnings(data.earningsCalendar || []);
      } catch (err) {
        console.error("Error fetching earnings:", err);
      }
    };

    fetchEarnings();
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow text-white">
      <h3 className="text-2xl font-semibold mb-4">📅 Upcoming Earnings</h3>
      {earnings.length === 0 ? (
        <p className="text-sm text-gray-400">Loading upcoming earnings...</p>
      ) : (
        <ul className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
          {earnings.slice(0, 10).map((item) => (
            <li key={item.symbol} className="border-b border-gray-700 pb-2">
              <div className="flex justify-between">
                <span className="font-medium text-cyan-400">{item.symbol}</span>
                <span className="text-sm text-gray-400">{item.epsEstimate ? `Est. EPS: ${item.epsEstimate}` : "No EPS Data"}</span>
              </div>
              <p className="text-sm text-gray-300">{item.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EarningsCalendar;