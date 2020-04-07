import React from "react";
import styled from "styled-components";
import { Select, InputLabel } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { MoneyCard } from "../MoneyCard/MoneyCard";
import { justNumbers, currencyMask } from "../../helpers/masks";
import { useWallet } from "../../hooks/useWallet";

const WalletContainer = styled.div`
  margin-top: 25px;
  border: 8px solid #fff;
  border-radius: 40px;
  background-color: #fff;
`;

const WalletValues = styled.div`
  display: flex;
  flex-direction: column;
`;

const ValuesByCoin = styled(WalletValues)`
  margin-left: 8px;
`;

const WalletContent = styled(WalletValues)`
  justify-content: space-between;
  align-items: baseline;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  padding: 25px;
`;

const Selects = styled(WalletValues)`
  width: 65px;
  margin-left: 16px;
`;

const CardContent = styled(WalletValues)`
  display: flex;
  flex-wrap: wrap;
  padding: 30px;
  border-radius: 30px;
  background-color: #e6f0fd;
`;

const Converter = styled(WalletValues)`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Wallet = () => {
  const {
    data,
    totalInReal,
    totalInEuro,
    totalInDollar,
    transaction,
    setFee,
    fee,
    setValue,
    value,
  } = useWallet();

  return (
    <WalletContainer>
      <WalletContent>
        <WalletValues>
          <h1>Saldo</h1>
          <ValuesByCoin>
            <h2>Reais: {totalInReal}</h2>
            <h2>Dólar: {totalInDollar}</h2>
            <h2>Euro: {totalInEuro}</h2>
          </ValuesByCoin>
        </WalletValues>
        <Converter>
          <Selects>
            <InputLabel shrink>De</InputLabel>
            <Select
              value={fee.from}
              onChange={(e) => setFee({ ...fee, from: e.target.value })}
            >
              <MenuItem value="real">Real</MenuItem>
              <MenuItem value="dollar">Dólar</MenuItem>
              <MenuItem value="euro">Euro</MenuItem>
            </Select>
          </Selects>
          <Selects>
            <InputLabel shrink>Para</InputLabel>
            <Select
              value={fee.to}
              onChange={(e) => setFee({ ...fee, to: e.target.value })}
            >
              <MenuItem value="real">Real</MenuItem>
              <MenuItem value="dollar">Dólar</MenuItem>
              <MenuItem value="euro">Euro</MenuItem>
            </Select>
          </Selects>
          <input
            type="text"
            value={currencyMask(value, 2, ",", ".").toString()}
            onChange={(e) => setValue(Number(justNumbers(e.target.value)))}
          />
          <button onClick={() => transaction(fee.from, fee.to, value)}>
            Converter
          </button>
        </Converter>
      </WalletContent>
      <CardContent>
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
          mark="euro"
        />
      </CardContent>
    </WalletContainer>
  );
};
