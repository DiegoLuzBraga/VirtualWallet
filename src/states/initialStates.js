import values from "../values.json";

export const data = JSON.parse(JSON.stringify(values));

export let walletState = {
  real: 5000,
  dollar: 0,
  euro: 0,
};

export let fee = {
  from: "real",
  to: "dollar",
};

export let transactionValue = 0;
