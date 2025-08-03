"use client";
import { useEffect, useState } from "react";
import { getMarkets } from "@/utils/api";
import { Coin } from "@/types/coin";
import CoinTable from "@/components/CoinTable";
import { useWatchlist } from "@/hooks/useWatchlist";

export type SortKey = "rank" | "price" | "volume" | "change";

export default function HomePage() {
  const { watchlist, toggleWatchlist } = useWatchlist();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    getMarkets(page)
      .then((data) => setCoins(data))
      .finally(() => setLoading(false));
  }, [page]);

  const filteredCoins = coins
    .filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortKey) {
        case "price": return b.current_price - a.current_price;
        case "volume": return b.total_volume - a.total_volume;
        case "change": return b.price_change_percentage_24h - a.price_change_percentage_24h;
        default: return a.market_cap_rank - b.market_cap_rank;
      }
    });

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Crypto Dashboard</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or symbol"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
          className="border p-2 rounded"
        >
          <option value="rank">Rank</option>
          <option value="price">Price</option>
          <option value="volume">Volume</option>
          <option value="change">24h %</option>
        </select>
      </div>

      <CoinTable
        coins={filteredCoins}
        watchlist={watchlist}
        toggleWatchlist={toggleWatchlist}
      />

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 border rounded voilet-100">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded"
        >
          Next
        </button>
      </div>
    </main>
  );
}
