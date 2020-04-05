import React from "react";
import { makeStyles } from "@material-ui/core";
import { formatDate, toMoney } from "../../helpers/masks";
import AttachMoneyRoundedIcon from "@material-ui/icons/AttachMoneyRounded";
import EuroSymbolRoundedIcon from "@material-ui/icons/EuroSymbolRounded";
import { LoadingButton } from "../LoadingButton/LoadingButton";

const useStyle = makeStyles({
  card: {
    padding: "16px",
    color: "#fff",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#9AC5E5",
    borderRadius: "20px",
    marginRight: "30px",
    marginTop: "2px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
  },
  cardEuro: {
    padding: "16px",
    color: "#fff",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "20px",
    backgroundColor: "#9FC9A5",
    marginTop: "2px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
  },
  title: { display: "flex", alignItems: "center" },
  button: { marginLeft: "40px" },
  icon: {
    marginRight: "8px",
    color: "#000",
    borderRadius: "8px"
  },
  dates: {
    color: "#d9d9d9",
    fontSize: "11px",
    marginTop: "4px"
  },
  coinValues: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    color: "#000",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: "8px",
    padding: "16px"
  },
  bid: {
    color: "green",
    fontWeight: "bold"
  },
  ask: {
    color: "red",
    fontWeight: "bold"
  }
});

export const MoneyCard = ({
  ask,
  bid,
  date,
  dollar,
  loading,
  mark,
  updateCurrency
}) => {
  const classes = useStyle();

  const translate = {
    dollar: "Dólar",
    euro: "Euro"
  };

  const iconByMark = () =>
    mark === "dollar" ? (
      <AttachMoneyRoundedIcon className={classes.icon} />
    ) : (
      <EuroSymbolRoundedIcon className={classes.icon} />
    );

  return (
    <div className={mark === "dollar" ? classes.card : classes.cardEuro}>
      <h3 className={classes.title}>
        {iconByMark()} {translate[mark]}{" "}
        <LoadingButton
          className={classes.button}
          loading={loading}
          onClick={updateCurrency}
          dollar={dollar}
        />
      </h3>
      <label className={classes.dates}>
        {formatDate(date, "DD/MM/YYYY HH:mm").replace(" ", " às ")}
      </label>
      <div className={classes.coinValues}>
        <label>
          <span className={classes.bid}>C</span>: {toMoney(bid)}
        </label>
        <label>
          <span className={classes.ask}>V</span>: {toMoney(ask)}
        </label>
      </div>
    </div>
  );
};