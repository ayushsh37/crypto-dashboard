import { useEffect, useState } from "react";

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    if (saved) setWatchlist(JSON.parse(saved));
  }, []);

  const toggleWatchlist = (coinId: string) => {
    let updated: string[];
    if (watchlist.includes(coinId)) {
      updated = watchlist.filter((id) => id !== coinId);
    } else {
      updated = [...watchlist, coinId];
    }
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  return { watchlist, toggleWatchlist };
};
