"use client";
import { useEffect, useState } from "react";
import { getMarkets } from "@/utils/api";
import { useWatchlist } from "@/hooks/useWatchlist";
import CoinTable from "@/components/CoinTable";
import { Coin } from "@/types/coin";

export default function WatchlistPage() {
  const { watchlist, toggleWatchlist } = useWatchlist();
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    getMarkets().then((data: Coin[]) =>
      setCoins(data.filter((coin) => watchlist.includes(coin.id)))
    );
  }, [watchlist]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Watchlist</h1>
      <CoinTable coins={coins} watchlist={watchlist} toggleWatchlist={toggleWatchlist} />
    </main>
  );
}
