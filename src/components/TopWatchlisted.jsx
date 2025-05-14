import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

// 🧪 Hardcoded top watchlisted stocks (mocked for now)
const topStocks = [
  { symbol: "AAPL", name: "Apple Inc.", rank: 1 },
  { symbol: "TSLA", name: "Tesla, Inc.", rank: 2 },
  { symbol: "NVDA", name: "NVIDIA Corp", rank: 3 },
  { symbol: "AMZN", name: "Amazon.com Inc.", rank: 4 },
  { symbol: "GOOGL", name: "Alphabet Inc.", rank: 5 },
];

const tagMap = {
  1: "🔥 Most Added",
  2: "⭐ Popular",
  3: "📈 Trending",
};

const colorMap = {
  1: "from-yellow-400 via-red-500 to-pink-500",
  2: "from-purple-400 to-blue-500",
  3: "from-green-400 to-emerald-500",
};

const TopWatchlisted = () => {
  const confettiRef = useRef(null);

  const fireConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">📥 Top Watchlisted Stocks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topStocks.map((stock) => (
          <div
            key={stock.symbol}
            onMouseEnter={() => stock.rank === 1 && fireConfetti()}
            className="bg-gray-800 text-white p-5 rounded-xl shadow-md hover:shadow-cyan-500/50 hover:-translate-y-1 transition transform duration-300 relative overflow-hidden group"
          >
            <h3 className="text-lg font-bold">{stock.name}</h3>
            <p className="text-sm text-gray-400 mb-2">{stock.symbol}</p>

            {/* 🏷️ Glowing Tag */}
            {tagMap[stock.rank] && (
              <span
                className={`inline-block text-xs font-semibold text-white px-2 py-1 rounded-full bg-gradient-to-r ${colorMap[stock.rank]} animate-pulse`}
              >
                {tagMap[stock.rank]}
              </span>
            )}

            {/* 🛠️ View link */}
            <a
              href={`/quote?symbol=${stock.symbol}`}
              className="block mt-4 text-cyan-400 text-sm hover:underline"
            >
              View Quote →
            </a>

            {/* ✨ Background shine on hover */}
            <div className="absolute inset-0 pointer-events-none group-hover:bg-white/5 transition duration-300 rounded-xl" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopWatchlisted;