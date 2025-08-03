"use client";
import { useEffect, useState } from "react";
import { useWatchlist } from "@/hooks/useWatchlist";
import { getMarkets } from "@/utils/api";
import { Coin } from "@/types/coin";
import CoinTable from "@/components/CoinTable";

export default function WatchlistPage() {
  const { watchlist, toggleWatchlist } = useWatchlist();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!watchlist.length) return;
    setLoading(true);
    getMarkets(1) // fetch top 50 & filter watchlist
      .then((data) => setCoins(data.filter((c) => watchlist.includes(c.id))))
      .finally(() => setLoading(false));
  }, [watchlist]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!watchlist.length) return <p className="p-6">No coins in watchlist</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Watchlist</h1>
      <CoinTable coins={coins} watchlist={watchlist} toggleWatchlist={toggleWatchlist} />
    </main>
  );
}
