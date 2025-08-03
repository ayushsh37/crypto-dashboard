"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCoinDetails, getCoinMarketChart } from "@/utils/api";
import Chart from "@/components/Chart";

export default function CoinDetailPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;
    getCoinDetails(id as string).then(setCoin);
    getCoinMarketChart(id as string, 7).then((data) => {
      const formatted = data.prices.map((p: any) => ({
        time: new Date(p[0]).toLocaleDateString(),
        price: p[1],
      }));
      setChartData(formatted);
    });
  }, [id]);

  if (!coin) return <p className="p-6">Loading...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <img src={coin.image.small} alt={coin.name} className="w-8 h-8" />
        {coin.name} ({coin.symbol.toUpperCase()})
      </h1>
      <p className="mb-4">Current Price: ${coin.market_data.current_price.usd.toLocaleString()}</p>
      <p className="mb-4">Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}</p>
      <p className="mb-4">24h Volume: ${coin.market_data.total_volume.usd.toLocaleString()}</p>
      <Chart data={chartData} />
    </main>
  );
}
