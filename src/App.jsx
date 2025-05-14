// App.jsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import About from "./pages/About";
import NewsFeed from "./components/NewFeed";
import StockQuote from "./pages/StockQuote";
import Dashboard from "./pages/Dashboard";
import StockSearchModal from "./components/StockSearchModal";



function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar onOpenSearch={() => setIsModalOpen(true)} />
      <StockSearchModal show={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/news" element={<NewsFeed />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quote" element={<StockQuote />} />
      </Routes>
    </div>
  );
}

export default App;