"use client";
interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}
export default function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search by name or symbol..."
      className="border p-2 rounded w-full md:w-1/3 mb-4"
    />
  );
}
