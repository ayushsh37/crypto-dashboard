import axios from "axios";
import { Coin, CoinDetail } from "@/types/coin";

const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;

const client = axios.create({
  baseURL: BASE_URL,
  headers: API_KEY ? { "x-cg-demo-api-key": API_KEY } : {},
});

export async function getMarkets(page = 1, perPage = 50): Promise<Coin[]> {
  const { data } = await client.get<Coin[]>("/coins/markets", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: perPage,
      page,
      sparkline: false,
    },
  });
  return data;
}

export async function getCoinDetails(id: string): Promise<CoinDetail> {
  const { data } = await client.get<CoinDetail>(`/coins/${id}`, {
    params: { localization: false, tickers: false, market_data: true },
  });
  return data;
}

export async function getCoinMarketChart(
  id: string,
  days: number
): Promise<{ prices: [number, number][] }> {
  const { data } = await client.get<{ prices: [number, number][] }>(
    `/coins/${id}/market_chart`,
    { params: { vs_currency: "usd", days } }
  );
  return data;
}
