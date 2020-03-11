import React, { useEffect } from "react";
import { useWallet } from "./useWallet";
import { MoneyCard } from "../MoneyCard/MoneyCard";
import { makeStyles } from "@material-ui/core";
import { toMoney } from "../../helpers/masks";

const useStyle = makeStyles({
  wallet: {
    marginTop: "25px",
    border: "8px solid #fff",
    borderRadius: "40px",
    backgroundColor: "#E6F0FD ",
    padding: "0 30px 30px"
  },
  walletValues: {},
  walletContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    flexDirection: "row",
    borderRadius: "0 0 40px 40px",
    backgroundColor: "#f5f5f5",
    boxShadow: "5px 3px 5px #8c8c8c",
    padding: "25px"
  },
  cardContent: {
    display: "flex"
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
        <div>
          <h1>Sáldo</h1>
          <div>
            <h2>Reais: {totalInReal}</h2>
            <h2>Dólar: {totalInDollar}</h2>
            <h2>Euro: {totalInEuro}</h2>
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
      <div>
        De: Real Para: Euro
        <input />
        <button>Converter</button>
      </div>
    </div>
  );
};
