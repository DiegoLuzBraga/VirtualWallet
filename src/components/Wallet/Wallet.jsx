import React from "react";
import styled from "styled-components";
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
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  padding: 25px;
`;

const Selects = styled(WalletValues)`
  width: 65px;
  margin: 0 16px 0 0;
  @media screen and (max-width: 721px) {
    margin-top: 12px;
  }
  @media (max-width: 424px) {
    width: -webkit-fill-available;
    margin-right: 0;
  }
`;

const CardContent = styled(WalletValues)`
  flex-wrap: wrap;
  flex-direction: row;
  padding: 30px;
  border-radius: 30px;
  background-color: #e6f0fd;
  @media screen and (max-width: 572px) {
    justify-content: center;
    padding: 30px 60px;
  }
  @media screen and (max-width: 400px) {
    justify-content: center;
    padding: 30px;
  }
`;

const Converter = styled(WalletValues)`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
`;

const InputLabel = styled.label`
  display: block;
  transform-origin: top left;
  opacity: 0.54;
  font-size: 12px;
  line-height: 1;
`;

const Select = styled.select`
  height: 32px;
  border-radius: 5px;
  border: 1px solid #bfbfbf;
  margin-top: 5px;
`;

const MoneyInput = styled.input`
  height: 32px;
  border-radius: 5px;
  border: 1px solid #bfbfbf;
  margin-top: 5px;
  padding: 0 12px;
  margin-right: 16px;

  @media (max-width: 424px) {
    width: -webkit-fill-available;
    margin-top: 12px;
    margin-right: 0;
  }
`;

const Button = styled.button`
  height: 32px;
  background-color: #2ed06e;
  color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 0 16px;
  transition: all 0.15s ease-in-out;
  outline: none;
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    background-color: #28b862;
    border-color: #28b862;
  }

  @media (min-width: 506px) and (max-width: 614px) {
    width: -webkit-fill-available;
    margin-top: 12px;
  }

  @media (max-width: 505px) {
    width: 195px;
  }

  @media (max-width: 424px) {
    margin-top: 12px;
    width: -webkit-fill-available;
  }
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
            <InputLabel>De</InputLabel>
            <Select
              value={fee.from}
              onChange={(e) => setFee({ ...fee, from: e.target.value })}
            >
              <option value="real">Real</option>
              <option value="dollar">Dólar</option>
              <option value="euro">Euro</option>
            </Select>
          </Selects>

          <MoneyInput
            type="text"
            value={currencyMask(value, 2, ",", ".").toString()}
            onChange={(e) => setValue(Number(justNumbers(e.target.value)))}
          />

          <Selects>
            <InputLabel>Para</InputLabel>
            <Select
              value={fee.to}
              onChange={(e) => setFee({ ...fee, to: e.target.value })}
            >
              <option value="real">Real</option>
              <option value="dollar">Dólar</option>
              <option value="euro">Euro</option>
            </Select>
          </Selects>
          <Button onClick={() => transaction(fee.from, fee.to, value)}>
            Converter
          </Button>
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
