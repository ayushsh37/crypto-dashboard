"use client";
import { useState, useEffect } from "react";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("watchlist");
    if (stored) {
      setWatchlist(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (id: string) => {
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((coinId) => coinId !== id) : [...prev, id]
    );
  };

  const isInWatchlist = (id: string) => watchlist.includes(id);

  return { watchlist, toggleWatchlist, isInWatchlist };
}
