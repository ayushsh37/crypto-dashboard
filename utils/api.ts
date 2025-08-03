import axios from "axios";

const API_URL = "https://api.coingecko.com/api/v3";

export const getMarkets = async (page = 1, perPage = 50) => {
  const { data } = await axios.get(`${API_URL}/coins/markets`, {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: perPage,
      page,
      sparkline: false,
    },
  });
  return data;
};

export const getCoinDetails = async (id: string) => {
  const { data } = await axios.get(`${API_URL}/coins/${id}`);
  return data;
};

export const getCoinMarketChart = async (id: string, days = 7) => {
  const { data } = await axios.get(`${API_URL}/coins/${id}/market_chart`, {
    params: { vs_currency: "usd", days },
  });
  return data;
};
