import { useState } from "react";
import { CurrencyValues, USDValues, EURValues, coins } from "../../types/types";
import { RequestFN } from "../../helpers/request";
import { useNotification } from "../../hooks/useNotification";
import { numberToMoney, toMoney } from "../../helpers/masks";

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

  const [fee, setFee] = useState<{ from: coins; to: coins }>({
    from: "real",
    to: "real"
  });

  const [value, setValue] = useState<number>(0);

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
    from: { target: coins; value: number },
    to: { target: coins; value: number },
    value: number
  ) => {
    if (wallet[from.target] < value) {
      return showNotification(
        "O valor escolhido é maior do que o limite disponível!",
        "warning"
      );
    } else {
      return setWallet({
        ...wallet,
        [from.target]: wallet[from.target] - value,
        [to.target]:
          wallet[to.target] +
          (value * from.value * 100) / (to.value * 100) / 100
      });
    }
  };

  const transaction = (from: coins, to: coins, value: number) => {
    const dictionary = {
      real: {
        dollar: () =>
          doTransaction(
            { target: from, value: 1 },
            { target: to, value: Number(toMoney(data.USD.bid)) },
            value
          ),
        euro: () =>
          doTransaction(
            { target: from, value: 1 },
            { target: to, value: Number(toMoney(data.EUR.bid)) },
            value
          ),
        real: () =>
          showNotification("Por favor, selecione outra moeda!", "warning")
      },
      dollar: {
        dollar: () =>
          showNotification("Por favor, selecione outra moeda!", "warning"),
        euro: () =>
          doTransaction(
            { target: to, value: Number(toMoney(data.USD.bid)) },
            { target: from, value: Number(toMoney(data.EUR.bid)) },
            value
          ),
        real: () =>
          doTransaction(
            { target: to, value: Number(toMoney(data.USD.bid)) },
            { target: from, value: 1 },
            value
          )
      },
      euro: {
        dollar: () =>
          doTransaction(
            { target: to, value: Number(toMoney(data.EUR.bid)) },
            { target: from, value: Number(toMoney(data.USD.bid)) },
            value
          ),
        euro: () =>
          showNotification("Por favor, selecione outra moeda!", "warning"),
        real: () =>
          doTransaction(
            { target: to, value: Number(toMoney(data.EUR.bid)) },
            { target: from, value: 1 },
            value
          )
      }
    };
    console.log(dictionary[from][to]());
    return dictionary[from][to]();
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
    transaction,
    setFee,
    fee,
    value,
    setValue
  } as const;
}
