interface CurrencyDetais {
  code: string;
  bid: string;
  ask: string;
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

export type coins = "real" | "dollar" | "euro";
