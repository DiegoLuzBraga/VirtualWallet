import React from "react";
import styled from "styled-components";
import { formatDate, toMoney } from "../../helpers/masks";
import { Euro } from "./icons/Euro";
import { Dollar } from "./icons/Dollar";

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
  width: 200px;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  background-color: ${(props) => (props.isDollar ? "#9AC5E5" : "#9FC9A5")};
  margin-right: ${(props) => (props.isDollar ? "30px" : "0px")};
  margin-top: 2px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 571px) {
    margin-right: 0px;
  }
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

export const MoneyCard = ({ ask, bid, date, mark }) => {
  const translate = {
    dollar: "Dólar",
    euro: "Euro",
  };

  return (
    <Card isDollar={mark === "dollar"}>
      <CoinTitle>
        {mark === "dollar" ? <Dollar /> : <Euro />} {translate[mark]}{" "}
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
