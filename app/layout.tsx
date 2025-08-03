import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crypto Dashboard",
  description: "Crypto Dashboard with Watchlist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-white min-h-screen">
        {/* Navbar */}
        <nav className="p-4 bg-gray-900 flex gap-6 shadow-md">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/watchlist" className="hover:underline">
            Watchlist
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
