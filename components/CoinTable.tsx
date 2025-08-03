"use client";
import Link from "next/link";
import { Star } from "lucide-react";

interface CoinTableProps {
  coins: any[];
  watchlist: string[];
  toggleWatchlist: (id: string) => void;
}

export default function CoinTable({ coins, watchlist, toggleWatchlist }: CoinTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">#</th>
            <th className="p-2">Coin</th>
            <th className="p-2">Price</th>
            <th className="p-2">24h %</th>
            <th className="p-2">Market Cap</th>
            <th className="p-2">Volume</th>
            <th className="p-2">Watchlist</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id} className="border-b">
              <td className="p-2">{coin.market_cap_rank}</td>
              <td className="p-2 flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                <Link href={`/coin/${coin.id}`} className="text-blue-500 hover:underline">
                  {coin.name} ({coin.symbol.toUpperCase()})
                </Link>
              </td>
              <td className="p-2">${coin.current_price.toLocaleString()}</td>
              <td
                className={`p-2 ${coin.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td className="p-2">${coin.market_cap.toLocaleString()}</td>
              <td className="p-2">${coin.total_volume.toLocaleString()}</td>
              <td className="p-2">
                <Star
                  className={`cursor-pointer ${
                    watchlist.includes(coin.id) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                  }`}
                  onClick={() => toggleWatchlist(coin.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
