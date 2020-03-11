import React from "react";
import { makeStyles } from "@material-ui/core";
import { formatDate, toMoney } from "../../helpers/masks";
import AttachMoneyRoundedIcon from "@material-ui/icons/AttachMoneyRounded";
import EuroSymbolRoundedIcon from "@material-ui/icons/EuroSymbolRounded";
import { LoadingButton } from "../LoadingButton/LoadingButton";

interface Props {
  ask: string;
  bid: string;
  date: string;
  loading: boolean;
  mark: "dollar" | "euro";
  updateCurrency(): Promise<void>;
}

const useStyle = makeStyles({
  card: {
    padding: "16px",
    color: "#fff",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#50A0DB",
    borderRadius: "20px",
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
    marginLeft: "30px",
    backgroundColor: "#378943",
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
  }
});

export const MoneyCard = ({
  ask,
  bid,
  date,
  loading,
  mark,
  updateCurrency
}: Props) => {
  const classes = useStyle();

  const translate: Record<"dollar" | "euro", string> = {
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
          children=""
          loading={loading}
          onClick={updateCurrency}
        />
      </h3>
      <label className={classes.dates}>
        {formatDate(date, "DD/MM/YYYY HH:mm").replace(" ", " às ")}
      </label>
      <div>
        <label>C: {toMoney(bid)}</label>
        <label>V: {toMoney(ask)}</label>
      </div>
    </div>
  );
};
