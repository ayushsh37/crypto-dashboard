"use client";
import { useEffect, useState } from "react";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("watchlist");
    if (stored) setWatchlist(JSON.parse(stored));
  }, []);

  const toggleWatchlist = (coinId: string) => {
    setWatchlist((prev) => {
      const exists = prev.includes(coinId);
      const updated = exists ? prev.filter((id) => id !== coinId) : [...prev, coinId];
      localStorage.setItem("watchlist", JSON.stringify(updated));
      return updated;
    });
  };

  return { watchlist, toggleWatchlist };
}
