import { useState } from "react";
import { CurrencyValues, USDValues, EURValues, coins } from "../../types/types";
import { RequestFN } from "../../helpers/request";
import { useNotification } from "../../hooks/useNotification";
import { numberToMoney } from "../../helpers/masks";

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

  const [wallet, setWallet] = useState<Record<coins, number>>({
    real: 500000,
    dollar: 0,
    euro: 0
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

  const doTransaction = (
    from: coins,
    to: coins,
    fee: number,
    value: number
  ) => {
    if (wallet[from] < value) {
      return showNotification(
        "O valor escolhido é maior do que o limite disponível!",
        "warning"
      );
    } else {
      return setWallet({
        ...wallet,
        [from]: wallet[from] - value,
        [to]: wallet[to] + value * fee
      });
    }
  };

  const transaction = (from: coins, to: coins, fee: number, value: number) => {
    const dictionary = {
      real: {
        dollar: () => doTransaction(from, to, fee, value),
        euro: () => doTransaction(from, to, fee, value),
        real: () =>
          showNotification("Por favor, selecione outra moeda!", "warning")
      },
      dollar: {
        dollar: () =>
          showNotification("Por favor, selecione outra moeda!", "warning"),
        euro: () => doTransaction(from, to, fee, value),
        real: () => doTransaction(from, to, fee, value)
      },
      euro: {
        dollar: () => doTransaction(from, to, fee, value),
        euro: () =>
          showNotification("Por favor, selecione outra moeda!", "warning"),
        real: () => doTransaction(from, to, fee, value)
      }
    };
    return dictionary[from][to];
  };

  return {
    getDollarAndEuro,
    getDollar,
    getEuro,
    totalInReal: numberToMoney(
      wallet["real"] - wallet["dollar"] - wallet["euro"]
    ),
    totalInDollar: numberToMoney(wallet["dollar"], "$"),
    totalInEuro: numberToMoney(wallet["euro"], "€"),
    data,
    loadings,
    transaction
  } as const;
}
