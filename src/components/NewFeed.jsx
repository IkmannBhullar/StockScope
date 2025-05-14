import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const NewsFeed = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [symbolInput, setSymbolInput] = useState(searchParams.get("symbol") || "");

  useEffect(() => {
    async function fetchNews() {
      const symbol = searchParams.get("symbol");
      const apiKey = import.meta.env.VITE_MARKETAUX_API_KEY;

      const url = `https://api.marketaux.com/v1/news/all?countries=us&filter_entities=true&limit=10${
        symbol ? `&symbols=${symbol}` : ""
      }&api_token=${apiKey}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        setArticles(data.data || []);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    }

    fetchNews();
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = symbolInput.trim().toUpperCase();
    navigate(`/news${trimmed ? `?symbol=${trimmed}` : ""}`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-950 text-white">
      <h1 className="text-3xl font-bold mb-4 text-center">🗞️ Stock Market News</h1>

      {/* 🔍 Search Input */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center items-center mb-8 gap-2"
      >
        <input
          type="text"
          value={symbolInput}
          onChange={(e) => setSymbolInput(e.target.value)}
          placeholder="Enter symbol (e.g. AAPL)"
          className="px-4 py-2 rounded-md text-black w-60 focus:outline-none focus:ring-2 ring-cyan-500"
        />
        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-md text-white"
        >
          Search
        </button>
      </form>

      {articles.length === 0 ? (
        <p className="text-center text-gray-400">Loading latest news...</p>
      ) : (
        <div className="space-y-6">
          {articles.map((article) => (
            <div
              key={article.uuid}
              className="bg-gray-800 p-4 rounded-xl shadow-md transition hover:shadow-lg flex flex-col md:flex-row gap-4"
            >
              {article.image_url && (
                <img
                  src={article.image_url}
                  alt="thumbnail"
                  className="w-full md:w-40 h-28 object-cover rounded-md"
                />
              )}
              <div className="flex flex-col flex-1">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <h2 className="text-xl font-semibold hover:underline">{article.title}</h2>
                </a>

                <div className="text-sm text-gray-400 mt-1 flex justify-between items-center flex-wrap">
                  <span>{new Date(article.published_at).toLocaleString()}</span>
                  <span className="text-cyan-400 font-medium">
                    {article.source || "Unknown Source"}
                  </span>
                </div>

                {/* Tags */}
                {article.entities && article.entities.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {article.entities.slice(0, 3).map((tag) => (
                      <span
                        key={tag.symbol}
                        className="text-xs bg-cyan-700 text-white px-2 py-1 rounded-full"
                      >
                        {tag.symbol}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-gray-300 mt-2 text-sm">{article.description}</p>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block self-start bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-4 py-2 rounded-md"
                >
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;