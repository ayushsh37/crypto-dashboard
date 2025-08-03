"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCoinDetails, getCoinMarketChart } from "@/utils/api";
import { CoinDetail } from "@/types/coin";
import PriceChart from "@/components/PriceChart";
import { useWatchlist } from "@/hooks/useWatchlist";

export default function CoinDetailPage() {
  const { id } = useParams() as { id: string };
  const { toggleWatchlist, isInWatchlist } = useWatchlist();

  const [coin, setCoin] = useState<CoinDetail | null>(null);
  const [chartData, setChartData] = useState<number[][]>([]);
  const [days, setDays] = useState<number>(7);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([getCoinDetails(id), getCoinMarketChart(id, days)])
      .then(([coinDetails, chart]) => {
        setCoin(coinDetails);
        setChartData(chart.prices);
      })
      .finally(() => setLoading(false));
  }, [id, days]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!coin) return <p className="p-6">Coin not found</p>;

  return (
    <main className="p-6">
      <div className="flex items-center gap-4">
        <img src={coin.image.small} alt={coin.name} className="w-12 h-12" />
        <h1 className="text-3xl font-bold">
          {coin.name} ({coin.symbol.toUpperCase()})
        </h1>
        <button
          onClick={() => toggleWatchlist(coin.id)}
          className="ml-4 text-2xl"
        >
          {isInWatchlist(coin.id) ? "⭐" : "☆"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <p>Price: ${coin.market_data.current_price.usd.toLocaleString()}</p>
        <p>Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}</p>
        <p>24h Volume: ${coin.market_data.total_volume.usd.toLocaleString()}</p>
        <p>Rank: #{coin.market_cap_rank}</p>
        <p>Circulating Supply: {coin.market_data.circulating_supply.toLocaleString()}</p>
        <p>Total Supply: {coin.market_data.total_supply?.toLocaleString() ?? "N/A"}</p>
      </div>

      {/* Chart Section */}
      <div className="mt-6">
        <div className="flex gap-4 mb-4">
          {[1, 7, 30, 90].map((d) => (
            <button
              key={d}
              className={`px-4 py-2 rounded ${days === d ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => setDays(d)}
            >
              {d === 1 ? "24h" : `${d}d`}
            </button>
          ))}
        </div>
        <PriceChart data={chartData} />
      </div>
    </main>
  );
}
