"use client";
import Link from "next/link";
import { Coin } from "@/types/coin";

interface CoinTableProps {
  coins: Coin[];
  watchlist: string[];
  toggleWatchlist: (id: string) => void;
}

export default function CoinTable({ coins, watchlist, toggleWatchlist }: CoinTableProps) {
  if (!coins.length) return <p>No coins found</p>;

  return (
    <table className="w-full border-collapse border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">#</th>
          <th className="p-2 text-left">Coin</th>
          <th className="p-2">Price</th>
          <th className="p-2">24h %</th>
          <th className="p-2">Market Cap</th>
          <th className="p-2">Volume</th>
          <th className="p-2">⭐</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin) => (
          <tr key={coin.id} className="border-t hover:bg-gray-50">
            <td className="p-2 text-center">{coin.market_cap_rank}</td>
            <td className="p-2 flex items-center gap-2">
              <img src={coin.image} alt={coin.name} className="w-6 h-6" />
              <Link href={`/coin/${coin.id}`} className="hover:underline">
                {coin.name} ({coin.symbol.toUpperCase()})
              </Link>
            </td>
            <td className="p-2 text-right">${coin.current_price.toLocaleString()}</td>
            <td className={`p-2 text-right ${coin.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"}`}>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </td>
            <td className="p-2 text-right">${coin.market_cap.toLocaleString()}</td>
            <td className="p-2 text-right">${coin.total_volume.toLocaleString()}</td>
            <td className="p-2 text-center">
              <button onClick={() => toggleWatchlist(coin.id)}>
                {watchlist.includes(coin.id) ? "⭐" : "☆"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
