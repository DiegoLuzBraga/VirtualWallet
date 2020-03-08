import React, { useEffect } from "react";
import { useWallet } from "./useWallet";
import { LoadingButton } from "../LoadingButton/LoadingButton";
import { MoneyCard } from "../MoneyCard/MoneyCard";

export const Wallet = () => {
  const { getDollarAndEuro, data, loading } = useWallet();

  useEffect(() => {
    getDollarAndEuro();
  }, []);

  return (
    <div>
      <LoadingButton
        children="Atualizar!"
        loading={loading}
        onClick={getDollarAndEuro}
      />
      <MoneyCard
        ask={data.USD.ask}
        bid={data.USD.bid}
        date={data.USD.create_date}
        mark="dollar"
      />
      <MoneyCard
        ask={data.EUR.ask}
        bid={data.EUR.bid}
        date={data.EUR.create_date}
        mark="dollar"
      />
    </div>
  );
};
