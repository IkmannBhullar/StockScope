const BASE_URL = "https://api.twelvedata.com";
const API_KEY = import.meta.env.VITE_TWELVE_API_KEY;

export async function fetchTrendingStocks(symbols = ["AAPL", "TSLA", "AMZN", "NVDA", "META"]) {
  const results = [];

  for (const symbol of symbols) {
    try {
      const res = await fetch(`${BASE_URL}/quote?symbol=${symbol}&apikey=${API_KEY}`);
      const data = await res.json();

      if (data && data.name && data.symbol && data.percent_change) {
        results.push({
          quote: `${data.percent_change}% Today`,
          name: data.name,
          title: data.symbol,
        });
      } else {
        console.warn("Missing data for:", symbol, data);
      }
    } catch (err) {
      console.error("Error fetching symbol:", symbol, err);
    }
  }

  return results;
}