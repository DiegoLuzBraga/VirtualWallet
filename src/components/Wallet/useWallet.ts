import { useState } from "react";
import { CurrencyValues, USDValues, EURValues, coins } from "../../types/types";
import { RequestFN } from "../../helpers/request";
import { useNotification } from "../../hooks/useNotification";

export function useWallet() {
  const [data, setData] = useState<CurrencyValues>({
    USD: {
      code: "",
      codein: "",
      name: "",
      high: "",
      low: "",
      varBid: "",
      pctChange: "",
      bid: "",
      ask: "",
      timestamp: "",
      create_date: ""
    },
    EUR: {
      code: "",
      codein: "",
      name: "",
      high: "",
      low: "",
      varBid: "",
      pctChange: "",
      bid: "",
      ask: "",
      timestamp: "",
      create_date: ""
    }
  });

  const [loadings, setLoadings] = useState<{
    all: boolean;
    dollar: boolean;
    euro: boolean;
  }>({
    all: false,
    dollar: false,
    euro: false
  });

  const [wallet, setWallet] = useState<{
    real: number[];
    dollar: number[];
    euro: number[];
  }>({
    real: [],
    dollar: [],
    euro: []
  });

  const showNotification = useNotification();

  const getDollarAndEuro = async () => {
    setLoadings({ ...loadings, all: true });
    await RequestFN<CurrencyValues>(
      "https://economia.awesomeapi.com.br/all/USD-BRL,EUR-BRL"
    )
      .then(response => setData(response))
      .catch(() =>
        showNotification("Houve um erro interno, tente novamente!", "error")
      )
      .finally(() => setLoadings({ ...loadings, all: false }));
  };

  const getDollar = async () => {
    setLoadings({ ...loadings, dollar: false });
    await RequestFN<USDValues>("https://economia.awesomeapi.com.br/all/USD-BRL")
      .then(response => setData({ ...data, USD: response.USD }))
      .catch(error =>
        showNotification("Houve um erro interno, tente novamente!", "error")
      )
      .finally(() => setLoadings({ ...loadings, dollar: false }));
  };

  const getEuro = async () => {
    setLoadings({ ...loadings, euro: false });
    await RequestFN<EURValues>("https://economia.awesomeapi.com.br/all/EUR-BRL")
      .then(response => setData({ ...data, EUR: response.EUR }))
      .catch(error =>
        showNotification("Houve um erro interno, tente novamente!", "error")
      )
      .finally(() => setLoadings({ ...loadings, euro: false }));
  };

  const transaction = (from: coins, to: coins, value: number) => {};

  const totalInReal = () => wallet.real.reduce((acc, coin) => (acc += coin), 0);

  const totalInDollar = () =>
    wallet.dollar.reduce((acc, coin) => (acc += coin), 0);

  const totalInEuro = () => wallet.euro.reduce((acc, coin) => (acc += coin), 0);

  return {
    getDollarAndEuro,
    getDollar,
    getEuro,
    totalInReal,
    totalInDollar,
    totalInEuro,
    data,
    loadings
  } as const;
}
