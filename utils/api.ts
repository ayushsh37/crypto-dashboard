import axios from "axios";
import { Coin, CoinDetail } from "@/types/coin";

const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY; // <- API Key goes here
const BASE_URL = "https://api.coingecko.com/api/v3";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: API_KEY ? { "x-cg-demo-api-key": API_KEY } : {},
});

export const getMarkets = async (page = 1): Promise<Coin[]> => {
  const { data } = await axiosInstance.get<Coin[]>("/coins/markets", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 50,
      page,
      sparkline: false,
    },
  });
  return data;
};

export const getCoinDetails = async (id: string): Promise<CoinDetail> => {
  const { data } = await axiosInstance.get<CoinDetail>(`/coins/${id}`, {
    params: { localization: false, tickers: false, market_data: true, community_data: false, developer_data: false },
  });
  return data;
};

export const getCoinMarketChart = async (id: string, days: number) => {
  const { data } = await axiosInstance.get(`/coins/${id}/market_chart`, {
    params: { vs_currency: "usd", days },
  });
  return data;
};
