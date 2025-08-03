"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCoinDetails, getCoinMarketChart } from "@/utils/api";
import Chart from "@/components/Chart";
import { CoinDetail, ChartPoint } from "@/types/coin";
import Image from "next/image";

export default function CoinDetailPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState<CoinDetail | null>(null);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [days, setDays] = useState(7);

  useEffect(() => {
    if (!id) return;
    getCoinDetails(id as string).then((data) => setCoin(data));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    getCoinMarketChart(id as string, days).then((data) => {
      const formatted = data.prices.map((p) => ({
        time: new Date(p[0]).toLocaleDateString(),
        price: p[1],
      }));
      setChartData(formatted);
    });
  }, [id, days]);

  if (!coin) return <p className="p-6">Loading...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Image src={coin.image.small} alt={coin.name} width={32} height={32} />
        {coin.name} ({coin.symbol.toUpperCase()})
      </h1>
      <p className="mb-2">Rank: {coin.market_cap_rank}</p>
      <p className="mb-2">Current Price: ${coin.market_data.current_price.usd.toLocaleString()}</p>
      <p className="mb-2">Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}</p>
      <p className="mb-2">24h Volume: ${coin.market_data.total_volume.usd.toLocaleString()}</p>
      <p className="mb-4">
        Supply: {coin.market_data.circulating_supply.toLocaleString()} /{" "}
        {coin.market_data.total_supply
          ? coin.market_data.total_supply.toLocaleString()
          : "∞"}
      </p>

      <div className="flex gap-2 mb-4">
        {[1, 7, 30, 90].map((range) => (
          <button
            key={range}
            onClick={() => setDays(range)}
            className={`px-3 py-1 rounded ${
              days === range ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {range === 1 ? "24h" : `${range}d`}
          </button>
        ))}
      </div>

      <Chart data={chartData} />
    </main>
  );
}
