interface CurrencyDetais {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
}

export interface CurrencyValues {
  USD: CurrencyDetais;
  EUR: CurrencyDetais;
}

export interface USDValues {
  USD: CurrencyDetais;
}

export interface EURValues {
  EUR: CurrencyDetais;
}
