import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useNotification } from "../../hooks/useNotification";
import { MoneyCard } from "../MoneyCard/MoneyCard";
import { currencyMask, justNumbers } from "../../helpers/masks";
import values from "../../values.json";

const data = JSON.parse(JSON.stringify(values));

const showNotification = useNotification();

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

export const Wallet = (props) => {
  const { fee, wallet, transactionValue } = props;

  return (
    <WalletContainer>
      <WalletContent>
        <WalletValues>
          <h1>Saldo</h1>
          <ValuesByCoin>
            <h2>Reais: {`R$ ${wallet.BRL}`}</h2>
            <h2>Dólar: {`$ ${wallet.USD}`}</h2>
            <h2>Euro: {`€ ${wallet.EUR}`}</h2>
          </ValuesByCoin>
        </WalletValues>
        <Converter>
          <Selects>
            <InputLabel>De</InputLabel>
            <Select
              value={fee.from}
              onChange={(e) => props.changeFromValue(e.target.value)}
            >
              <option value="BRL">Real</option>
              <option value="USD">Dólar</option>
              <option value="EUR">Euro</option>
            </Select>
          </Selects>

          <MoneyInput
            type="text"
            value={currencyMask(transactionValue, 2, ",", ".").toString()}
            onChange={(e) =>
              props.changeTransactionValue(Number(justNumbers(e.target.value)))
            }
          />

          <Selects>
            <InputLabel>Para</InputLabel>
            <Select
              value={fee.to}
              onChange={(e) => props.changeToValue(e.target.value)}
            >
              <option value="BRL">Real</option>
              <option value="USD">Dólar</option>
              <option value="EUR">Euro</option>
            </Select>
          </Selects>
          <Button
            onClick={() =>
              props.processTransaction(
                `${fee.from.toUpperCase()}_TO_${fee.to.toUpperCase()}`,
                {
                  ...wallet,
                  value: transactionValue,
                  from: fee.from === "BRL" ? 1 : data[fee.from].bid,
                  to: fee.to === "BRL" ? 1 : data[fee.to].ask,
                }
              )
            }
          >
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

const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
    fee: state.fee,
    transactionValue: state.transactionValue,
  };
};

const mapDispatchToProps = (dispatch) => ({
  processTransaction: (dispatchType, value) =>
    dispatch({ type: dispatchType, values: value }),
  changeFromValue: (value) => dispatch({ type: "FROM", from: value }),
  changeToValue: (value) => dispatch({ type: "TO", to: value }),
  changeTransactionValue: (value) =>
    dispatch({ type: "CHANGE_VALUE", total: value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
