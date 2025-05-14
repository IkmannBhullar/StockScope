// src/lib/fetchDailyQuotes.js
export async function fetchDailyQuotes(symbols) {
    const cacheKey = "daily_quotes_cache";
    const cached = JSON.parse(localStorage.getItem(cacheKey) || "{}");
  
    const today = new Date().toISOString().slice(0, 10); // e.g., "2025-05-12"
  
    // If data is from today, reuse it
    if (cached.date === today && cached.data) {
      return cached.data;
    }
  
    // Else: Fetch new quotes
    const quotes = {};
    for (const symbol of symbols) {
      try {
        const res = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`
        );
        const data = await res.json();
        quotes[symbol] = {
          price: data.c,
          change: data.d,
          percent: data.dp,
        };
      } catch (err) {
        console.error(`Failed fetching quote for ${symbol}`, err);
      }
    }
  
    // Cache result
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        date: today,
        data: quotes,
      })
    );
  
    return quotes;
  }