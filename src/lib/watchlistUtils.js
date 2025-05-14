export function addToWatchlist(item) {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    const exists = saved.find((s) => s.symbol === item.symbol);
    if (!exists) {
      const updated = [...saved, item];
      localStorage.setItem("watchlist", JSON.stringify(updated));
      return true;
    }
    return false;
  }