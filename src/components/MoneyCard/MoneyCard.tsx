import React from "react";
import { makeStyles } from "@material-ui/core";
import { formatDate, numberToMoney } from "../../helpers/masks";
import AttachMoneyRoundedIcon from "@material-ui/icons/AttachMoneyRounded";
import EuroSymbolRoundedIcon from "@material-ui/icons/EuroSymbolRounded";

interface Props {
  ask: string;
  bid: string;
  date: string;
  mark: "dollar" | "euro";
  //   updateCurrency(): void;
}

const useStyle = makeStyles({
  icon: {
    backgroundColor: "#fff",
    borderRadius: "8px"
  }
});

export const MoneyCard = ({ ask, bid, date, mark }: Props) => {
  const classes = useStyle();

  const translate: Record<"dollar" | "euro", string> = {
    dollar: "Dolar",
    euro: "Euro"
  };
  return (
    <div>
      <h2>
        Dólar <AttachMoneyRoundedIcon className={classes.icon} />
      </h2>
      Valor de compra: {numberToMoney(bid)}
      Valor de venda: {numberToMoney(ask)}
      Última atualização:
      {formatDate(date, "DD/MM/YYYY HH:mm").replace(" ", " às ")}
    </div>
  );
};
