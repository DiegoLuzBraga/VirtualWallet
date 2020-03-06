import React, { useEffect, useState } from "react";
import { RequestFN } from "../../hooks/request";
import { MoneySymbols } from "../../types/types";

export const Wallet = () => {
  const [data, setData] = useState<MoneySymbols>();
  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    const response = await RequestFN(() =>
      fetch("https://economia.awesomeapi.com.br/all")
    );
    const body: MoneySymbols = await response.data?.json();
    if (response.status === "success") {
      setData(body);
    }
  };

  return (
    <div>
      Hi, I`m going to be amazing!
      <button onClick={getAll}>CLICK ME!</button>
    </div>
  );
};
