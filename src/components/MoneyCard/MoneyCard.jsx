import React from "react";
import styled from "styled-components";
import { formatDate, toMoney } from "../../helpers/masks";
import AttachMoneyRoundedIcon from "@material-ui/icons/AttachMoneyRounded";
import EuroSymbolRoundedIcon from "@material-ui/icons/EuroSymbolRounded";

const CoinValues = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  padding: 16px;
  color: #000;
  border-radius: 20px;
  margin-top: 8px;
`;

const Card = styled(CoinValues)`
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  background-color: ${(props) => (props.isDollar ? "#9AC5E5" : "#9FC9A5")};
  margin-right: ${(props) => (props.isDollar ? "30px" : "0px")};
  margin-top: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const CoinTitle = styled.h3`
  display: flex;
  align-items: center;
`;

const Dates = styled.label`
  color: #d9d9d9;
  font-size: 11px;
  margin-top: 4px;
`;

const Values = styled.span`
  color: ${(props) => (props.isBid ? "green" : "red")};
  font-weight: "bold";
`;

const DollarIcon = styled(AttachMoneyRoundedIcon)`
  margin-right: 8px;
  color: #000;
  border-radius: 8px;
`;

const EuroIcon = styled(EuroSymbolRoundedIcon)`
  margin-right: 8px;
  color: #000;
  border-radius: 8px;
`;

export const MoneyCard = ({ ask, bid, date, mark }) => {
  const translate = {
    dollar: "Dólar",
    euro: "Euro",
  };

  const iconByMark = () => (mark === "dollar" ? <DollarIcon /> : <EuroIcon />);

  return (
    <Card isDollar={mark === "dollar"}>
      <CoinTitle>
        {iconByMark()} {translate[mark]}{" "}
      </CoinTitle>
      <Dates>{formatDate(date, "DD/MM/YYYY HH:mm").replace(" ", " às ")}</Dates>
      <CoinValues>
        <label>
          <Values isBid>C</Values>: {toMoney(bid)}
        </label>
        <label>
          <Values>V</Values>: {toMoney(ask)}
        </label>
      </CoinValues>
    </Card>
  );
};
