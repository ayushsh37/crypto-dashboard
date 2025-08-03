export interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  circulating_supply?: number;
  total_supply?: number;
}

export interface CoinDetail {
  id: string;
  name: string;
  symbol: string;
  image: { small: string; large: string };
  market_cap_rank: number;
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    circulating_supply: number;
    total_supply: number;
  };
}

export interface ChartPoint {
  time: string;
  price: number;
}
