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
    height: "300px",
    width: "200px",
    color: "#fff",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#50A0DB",
    borderRadius: "20px",
    boxShadow: "0 10px 5px #B0CDEF"
  },
  cardEuro: {
    height: "300px",
    width: "200px",
    color: "#fff",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "20px",
    marginLeft: "30px",
    backgroundColor: "#378943",
    boxShadow: "0 10px 5px #B0CDEF"
  },
  icon: {
    color: "#000",
    borderRadius: "8px"
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
      {iconByMark()}
      <h3>{translate[mark]}</h3>
      <label>Valor de compra: {toMoney(bid)}</label>
      <label>Valor de venda: {toMoney(ask)}</label>
      <label>{formatDate(date, "DD/MM/YYYY HH:mm").replace(" ", " às ")}</label>
      <LoadingButton
        children="Atualizar!"
        loading={loading}
        onClick={updateCurrency}
      />
    </div>
  );
};
