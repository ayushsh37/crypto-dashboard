"use client";
interface FiltersProps {
  sortKey: string;
  setSortKey: (key: string) => void;
}

export default function Filters({ sortKey, setSortKey }: FiltersProps) {
  return (
    <div className="flex gap-4 mb-4">
      <select
        className="border p-2 rounded"
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value)}
      >
        <option value="market_cap_rank">Rank</option>
        <option value="price_change_percentage_24h">24h %</option>
        <option value="total_volume">Volume</option>
      </select>
    </div>
  );
}
