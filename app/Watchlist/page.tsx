"use client";
import { useEffect, useState } from "react";
import { useWatchlist } from "@/hooks/useWatchlist";
import { getMarkets } from "@/utils/api";
import { Coin } from "@/types/coin";
import Link from "next/link";

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!watchlist.length) {
      setCoins([]);
      setLoading(false);
      return;
    }
    getMarkets(1)
      .then((data) => {
        setCoins(data.filter((c) => watchlist.includes(c.id)));
      })
      .finally(() => setLoading(false));
  }, [watchlist]);

  if (loading) return <p className="p-6">Loading watchlist...</p>;

  if (!coins.length)
    return (
      <p className="p-6">
        No coins in watchlist. ⭐ some on homepage first!
      </p>
    );

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Watchlist</h1>
      <table className="min-w-full bg-transparent text-white shadow-md rounded">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Coin</th>
            <th className="p-2 text-left">Price</th>
            <th className="p-2 text-left">24h %</th>
            <th className="p-2 text-left">Market Cap</th>
            <th className="p-2 text-left">24h Volume</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
