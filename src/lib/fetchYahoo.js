// src/lib/fetchYahoo.js
const headers = {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
    "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST
  };
  
  export async function fetchTrendingYahoo() {
    const res = await fetch(
      "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-trending-tickers?region=US",
      { headers }
    );
    const data = await res.json();
    return data.finance.result[0].quotes.map((q) => ({
      name: q.shortName,
      symbol: q.symbol,
      quote: `${q.regularMarketChangePercent.toFixed(2)}%`,
      price: q.regularMarketPrice
    }));
  }