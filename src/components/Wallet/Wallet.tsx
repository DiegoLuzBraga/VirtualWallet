import React, { useEffect, useState } from "react";

import { RequestFN } from "../../helpers/request";
import { MoneySymbols } from "../../types/types";

import { LoadingButton } from "../LoadingButton/LoadingButton";

export const Wallet = () => {
  const [data, setData] = useState<MoneySymbols>({
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

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    setLoading(true);
    return RequestFN<MoneySymbols>("https://economia.awesomeapi.com.br/all")
      .then(response => setData(response))
      .catch(error => console.error(error.message))
      .finally(() => setLoading(false));
  };

  return (
    <div key={data.USD.ask}>
      Hi, I`m going to be amazing!
      <LoadingButton children="Atualizar!" loading={loading} onClick={getAll} />
      <div>
        Valor de compra: {data.USD.bid}
        Valor de venda: {data.USD.ask}
      </div>
    </div>
  );
};
