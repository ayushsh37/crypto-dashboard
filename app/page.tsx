"use client";
import { useEffect, useState } from "react";
import { getMarkets } from "@/utils/api";
import { useWatchlist } from "@/hooks/useWatchlist";
import CoinTable from "@/components/CoinTable";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";
import { Coin } from "@/types/coin";
import { SortKey } from "@/types/sort";   // <-- import type here

export default function Home() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("market_cap_rank");
  const { watchlist, toggleWatchlist } = useWatchlist();

  useEffect(() => {
    setLoading(true);
    setError("");
    getMarkets(page)
      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load coins");
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    const result = coins
      .filter(
        (coin) =>
          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (sortKey === "market_cap_rank") return a.market_cap_rank - b.market_cap_rank;
        if (sortKey === "price_change_percentage_24h")
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        if (sortKey === "total_volume") return b.total_volume - a.total_volume;
        return 0;
      });
    setFilteredCoins(result);
  }, [coins, search, sortKey]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Top Cryptocurrencies</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <Filters sortKey={sortKey} setSortKey={setSortKey} />
      {filteredCoins.length === 0 ? (
        <p className="mt-4">No coins match your search.</p>
      ) : (
        <CoinTable coins={filteredCoins} watchlist={watchlist} toggleWatchlist={toggleWatchlist} />
      )}
      <Pagination page={page} totalPages={5} onPageChange={setPage} />
    </main>
  );
}
