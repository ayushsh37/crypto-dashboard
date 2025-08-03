"use client";
import { useEffect, useState } from "react";
import { getMarkets } from "@/utils/api";
import { useWatchlist } from "@/hooks/useWatchlist";
import CoinTable from "@/components/CoinTable";
import SearchBar from "@/components/SearchBar";
import { Coin } from "@/types/coin";

export default function Home() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState("");
  const { watchlist, toggleWatchlist } = useWatchlist();

  useEffect(() => {
    getMarkets().then((data: Coin[]) => setCoins(data));
  }, []);

  useEffect(() => {
    setFilteredCoins(
      coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, coins]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Top Cryptocurrencies</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <CoinTable coins={filteredCoins} watchlist={watchlist} toggleWatchlist={toggleWatchlist} />
    </main>
  );
}
