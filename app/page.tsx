"use client";
import { useEffect, useState } from "react";
import { getMarkets } from "@/utils/api";
import { useWatchlist } from "@/hooks/useWatchlist";
import CoinTable from "@/components/CoinTable";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";
import { Coin } from "@/types/coin";

export default function Home() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("market_cap_rank");
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
      .sort((a, b) => (b as any)[sortKey] - (a as any)[sortKey]);
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
