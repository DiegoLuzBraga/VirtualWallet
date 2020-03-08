import { useState } from "react";
import { CurrencyValues, USDValues, EURValues } from "../../types/types";
import { RequestFN } from "../../helpers/request";
import { useSnackbar, OptionsObject } from "notistack";
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
  const [loading, setLoading] = useState<boolean>(false);

  const showNotification = useNotification();

  const getDollarAndEuro = async () => {
    setLoading(true);
    await RequestFN<CurrencyValues>(
      "https://economia.awesomeapi.com.br/all/USD-BRL,EUR-BRL"
    )
      .then(response => setData(response))
      .catch(() =>
        showNotification("Houve um erro interno, tente novamente!", "error")
      )
      .finally(() => setLoading(false));
  };

  const getDollar = async () => {
    setLoading(true);
    await RequestFN<USDValues>("https://economia.awesomeapi.com.br/all/USD-BRL")
      .then(response => setData({ ...data, USD: response.USD }))
      .catch(error =>
        showNotification("Houve um erro interno, tente novamente!", "error")
      )
      .finally(() => setLoading(false));
  };

  const getEuro = async () => {
    setLoading(true);
    await RequestFN<EURValues>("https://economia.awesomeapi.com.br/all/EUR-BRL")
      .then(response => setData({ ...data, USD: response.EUR }))
      .catch(error =>
        showNotification("Houve um erro interno, tente novamente!", "error")
      )
      .finally(() => setLoading(false));
  };

  return { getDollarAndEuro, getDollar, getEuro, data, loading } as const;
}
