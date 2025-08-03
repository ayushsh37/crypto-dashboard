import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Crypto Dashboard",
  description: "Track top cryptocurrencies, details, and watchlist",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  );
}

<nav className="p-4 bg-gray-900 text-white flex gap-4">
  <Link href="/">Home</Link>
  <Link href="/watchlist">Watchlist</Link>
</nav>