import React, { useEffect } from "react";
import { useWallet } from "./useWallet";
import { MoneyCard } from "../MoneyCard/MoneyCard";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  wallet: {
    marginTop: "25px",
    border: "8px solid #fff",
    borderRadius: "40px",
    backgroundColor: "#fff"
  },
  walletValues: {
    display: "flex",
    flexDirection: "column"
  },
  valuesByCoin: {
    display: "flex",
    flexDirection: "column"
  },
  walletContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: "20px 20px 0 0",
    padding: "25px"
  },
  cardContent: {
    display: "flex",
    padding: "32px",
    borderRadius: "30px",
    backgroundColor: "#E6F0FD"
  }
});

export const Wallet = () => {
  const classes = useStyle();
  const {
    getDollarAndEuro,
    getDollar,
    getEuro,
    data,
    loadings,
    totalInReal,
    totalInEuro,
    totalInDollar
  } = useWallet();

  useEffect(() => {
    getDollarAndEuro();
  }, []);

  return (
    <div className={classes.wallet}>
      <div className={classes.walletContent}>
        <div className={classes.walletValues}>
          <h1>Saldo</h1>
          <div className={classes.valuesByCoin}>
            <h2>Reais: {totalInReal}</h2>
            <h2>Dólar: {totalInDollar}</h2>
            <h2>Euro: {totalInEuro}</h2>
          </div>
        </div>
        <div>
          De: Real Para: Euro
          <input />
          <button>Converter</button>
        </div>
      </div>
      <div className={classes.cardContent}>
        <MoneyCard
          ask={data.USD.ask}
          bid={data.USD.bid}
          date={data.USD.create_date}
          loading={loadings.dollar}
          mark="dollar"
          updateCurrency={getDollar}
        />
        <MoneyCard
          ask={data.EUR.ask}
          bid={data.EUR.bid}
          date={data.EUR.create_date}
          loading={loadings.euro}
          mark="euro"
          updateCurrency={getEuro}
        />
      </div>
    </div>
  );
};
