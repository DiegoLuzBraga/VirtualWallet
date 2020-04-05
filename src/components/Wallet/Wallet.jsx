import React, { useEffect } from "react";
import { makeStyles, Select, InputLabel } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { MoneyCard } from "../MoneyCard/MoneyCard";
import { justNumbers, currencyMask } from "../../helpers/masks";
import { useWallet } from "../../hooks/useWallet";

const useStyle = makeStyles({
  wallet: {
    marginTop: "25px",
    border: "8px solid #fff",
    borderRadius: "40px",
    backgroundColor: "#fff"
  },
  walletValues: {
    display: "flex",
    flexDirection: "column"
  },
  valuesByCoin: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "8px"
  },
  walletContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: "20px 20px 0 0",
    padding: "25px"
  },
  cardContent: {
    display: "flex",
    flexWrap: "wrap",
    padding: "30px",
    borderRadius: "30px",
    backgroundColor: "#E6F0FD"
  },
  converter: {
    display: "flex",
    flexDirection: "row"
  },
  selects: {
    width: "65px",
    display: "flex",
    flexDirection: "column",
    marginLeft: "16px"
  }
});

export const Wallet = () => {
  const classes = useStyle();
  const {
    getDollarAndEuro,
    getDollar,
    getEuro,
    data,
    loadings,
    totalInReal,
    totalInEuro,
    totalInDollar,
    transaction,
    setFee,
    fee,
    setValue,
    value
  } = useWallet();

  useEffect(() => {
    getDollarAndEuro();
  }, []);

  return (
    <div className={classes.wallet}>
      <div className={classes.walletContent}>
        <div className={classes.walletValues}>
          <h1>Saldo</h1>
          <div className={classes.valuesByCoin}>
            <h2>Reais: {totalInReal}</h2>
            <h2>Dólar: {totalInDollar}</h2>
            <h2>Euro: {totalInEuro}</h2>
          </div>
        </div>
        <div className={classes.converter}>
          <div className={classes.selects}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              De
            </InputLabel>
            <Select
              value={fee.from}
              onChange={e => setFee({ ...fee, from: e.target.value })}
            >
              <MenuItem value="real">Real</MenuItem>
              <MenuItem value="dollar">Dólar</MenuItem>
              <MenuItem value="euro">Euro</MenuItem>
            </Select>
          </div>
          <div className={classes.selects}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Para
            </InputLabel>
            <Select
              value={fee.to}
              onChange={e => setFee({ ...fee, to: e.target.value })}
            >
              <MenuItem value="real">Real</MenuItem>
              <MenuItem value="dollar">Dólar</MenuItem>
              <MenuItem value="euro">Euro</MenuItem>
            </Select>
          </div>
          <input
            type="text"
            value={currencyMask(value, 2, ",", ".").toString()}
            onChange={e => setValue(Number(justNumbers(e.target.value)))}
          />
          <button onClick={() => transaction(fee.from, fee.to, value)}>
            Converter
          </button>
        </div>
      </div>
      <div className={classes.cardContent}>
        <MoneyCard
          ask={data.USD.ask}
          bid={data.USD.bid}
          date={data.USD.create_date}
          dollar
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
