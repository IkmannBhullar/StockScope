import { useEffect, useState } from "react";
import { LampDemo } from "../ui/Lamp";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { fetchTrendingStocks } from "../lib/fetchstocks";
import TrendingStocks from "../components/TrendingStocks";
import SectorStocksModal from "../components/SectorStockModal";
import SectorGrid from "../components/SectorGrid";
import { isUSMarketOpen } from "../lib/utils";
import TopWatchlisted from "../components/TopWatchlisted";
import EarningsCalendar from "../components/EarningsCalendar";
import GlobalMarkets from "../components/GlobalMarkets";
import UpcomingEarnings from "../components/UpcomingEarnings";


const Home = () => {
  const [trendingStocks, setTrendingStocks] = useState([]);
  const [selectedSector, setSelectedSector] = useState(null);
  const [randomPick, setRandomPick] = useState(null);
  const [marketOpen, setMarketOpen] = useState(false);

  useEffect(() => {
    fetchTrendingStocks()
      .then((data) => {
        setTrendingStocks(data);
        const pick = data[Math.floor(Math.random() * data.length)];
        setRandomPick(pick);
      })
      .catch(console.error);

    setMarketOpen(isUSMarketOpen());
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <LampDemo />

      <main className="w-full px-4 py-12 space-y-20">
        {/* 🔥 Trending Stocks Carousel */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">🔥 Trending Stocks</h2>
          {trendingStocks.length > 0 ? (
            <InfiniteMovingCards items={trendingStocks} direction="left" speed="fast" />
          ) : (
            <p className="text-center text-gray-400">Loading trending stocks...</p>
          )}
        </section>

        {/* 📊 Dashboard Cards */}
        <section className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-white">📊 Quick Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">Your Watchlist</h3>
              <p className="text-gray-300 text-sm">
                Track your saved stocks and performance insights.
              </p>
              <a href="/dashboard" className="mt-3 inline-block text-cyan-400 hover:underline text-sm">
                View Dashboard →
              </a>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">Market Status</h3>
              <p className="text-gray-300 text-sm">Real-time exchange activity and overview.</p>
              <p className={`mt-2 font-medium ${marketOpen ? "text-green-400" : "text-red-400"}`}>
                {marketOpen ? "🟢 U.S. Market Open" : "🔴 U.S. Market Closed"}
              </p>
            </div>
          </div>
        </section>

        {/* 📈 Explore Section */}
        <section id="explore" className="max-w-7xl mx-auto space-y-12">
          <h2 className="text-3xl font-bold text-white">📈 Explore Markets</h2>

          <TrendingStocks />

          <SectorGrid onSectorClick={setSelectedSector} />
          {selectedSector && (
            <SectorStocksModal
              sector={selectedSector}
              onClose={() => setSelectedSector(null)}
            />
          )}

          {/* ⭐ Spotlight Stock */}
          {randomPick && (
            <div className="bg-gray-800 p-6 rounded-xl shadow text-white">
              <h3 className="text-2xl font-semibold mb-2">⭐ Stock Spotlight</h3>
              <p className="text-sm text-gray-400 mb-2">Random featured stock of the day:</p>
              <h4 className="text-lg font-bold">{randomPick.name || "Stock Name"}</h4>
              <p className="text-cyan-400 text-sm">{randomPick.symbol}</p>
              <a
                href={`/quote?symbol=${randomPick.symbol}`}
                className="mt-3 inline-block text-sm text-cyan-400 hover:underline"
              >
                View Quote →
              </a>
            </div>
          )}

          {/* ✅ Top Watchlisted */}
          <TopWatchlisted />

          {/* ✅ Earnings Calendar */}
          <EarningsCalendar />

          {/* 🔜 Global Markets */}
          <GlobalMarkets />

        </section>
      </main>
    </div>
  );
};

export default Home;