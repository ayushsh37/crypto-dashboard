"use client";
import { useEffect, useState } from "react";
import { getMarkets } from "@/utils/api";
import { Coin } from "@/types/coin";
import Link from "next/link";
import { useWatchlist } from "@/hooks/useWatchlist";

export default function HomePage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { watchlist, toggleWatchlist } = useWatchlist();

  useEffect(() => {
    getMarkets(1)
      .then((data) => setCoins(data))
      .finally(() => setLoading(false));
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="p-6 text-white">Loading...</p>;

  return (
    <main className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Top Cryptocurrencies</h1>
      <input
        type="text"
        placeholder="Search by name or symbol"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 rounded text-black"
      />
      {filteredCoins.length === 0 ? (
        <p>No coins match your search.</p>
      ) : (
        <table className="min-w-full bg-transparent text-white shadow-md rounded">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Coin</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">24h %</th>
              <th className="p-2 text-left">Market Cap</th>
              <th className="p-2 text-left">24h Volume</th>
              <th className="p-2 text-left">⭐</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((coin) => (
              <tr key={coin.id} className="border-t border-gray-700">
                <td className="p-2">{coin.market_cap_rank}</td>
                <td className="p-2">
                  <Link
                    href={`/coin/${coin.id}`}
                    className="hover:underline flex items-center gap-2 text-white"
                  >
                    <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </Link>
                </td>
                <td className="p-2">
                  ${coin.current_price.toLocaleString()}
                </td>
                <td
                  className={`p-2 ${
                    coin.price_change_percentage_24h > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="p-2">
                  ${coin.market_cap.toLocaleString()}
                </td>
                <td className="p-2">
                  ${coin.total_volume.toLocaleString()}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => toggleWatchlist(coin.id)}
                    className="text-xl"
                  >
                    {watchlist.includes(coin.id) ? "★" : "☆"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
