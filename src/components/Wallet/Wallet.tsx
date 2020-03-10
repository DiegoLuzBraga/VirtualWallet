import React, { useEffect } from "react";
import { useWallet } from "./useWallet";
import { MoneyCard } from "../MoneyCard/MoneyCard";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  container: {
    width: "100%",
    height: "100%"
  },
  cardContent: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    border: "8px solid #f5f5f5",
    borderRadius: "0 0 40px 40px",
    backgroundColor: "#E6F0FD",
    boxShadow: "5px 3px 10px #8c8c8c",
    padding: "0 25px 25px"
  }
});

export const Wallet = () => {
  const classes = useStyle();
  const { getDollarAndEuro, getDollar, getEuro, data, loadings } = useWallet();

  useEffect(() => {
    getDollarAndEuro();
  }, []);

  return (
    <div className={classes.container}>
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
