import { useState } from "react";
import currency from "currency.js";
import { useNotification } from "./useNotification";
import { toMoney } from "../helpers/masks";
import values from "../values.json";

export function useWallet() {
  const data = JSON.parse(JSON.stringify(values));

  const [wallet, setWallet] = useState({
    real: 5000,
    dollar: 0,
    euro: 0,
  });

  const [fee, setFee] = useState({
    from: "BRL",
    to: "USD",
  });

  const [value, setValue] = useState(0);

  const showNotification = useNotification();

  const doTransaction = (from, to, value) => {
    if (wallet[fee.from] < value / 100) {
      return showNotification(
        "O valor escolhido é maior do que o limite disponível!",
        "warning"
      );
    } else {
      return setWallet({
        ...wallet,
        [fee.from]: currency(wallet[fee.from]).subtract(value / 100).value,
        // this operation converts the value passed to reais
        // and converts it again to the coin selected.
        // In a math way: fee.to = fee.to + (value / 100) * from.value / to.value
        [fee.to]: currency(wallet[fee.to]).add(
          currency(value).divide(100).multiply(from.value).divide(to.value)
            .value
        ).value,
      });
    }
  };

  const transaction = (from, to, value) => {
    const dictionary = {
      real: {
        dollar: () =>
          doTransaction(
            { target: from, value: 1 },
            {
              target: to,
              value: Number(
                toMoney(data.USD.bid).replace("R$ ", "").replace(",", ".")
              ),
            },
            value
          ),
        euro: () =>
          doTransaction(
            { target: from, value: 1 },
            {
              target: to,
              value: Number(
                toMoney(data.EUR.bid).replace("R$ ", "").replace(",", ".")
              ),
            },
            value
          ),
        real: () =>
          showNotification("Por favor, selecione outra moeda!", "warning"),
      },
      dollar: {
        dollar: () =>
          showNotification("Por favor, selecione outra moeda!", "warning"),
        euro: () =>
          doTransaction(
            {
              target: to,
              value: Number(
                toMoney(data.USD.bid).replace("R$ ", "").replace(",", ".")
              ),
            },
            {
              target: from,
              value: Number(
                toMoney(data.EUR.bid).replace("R$ ", "").replace(",", ".")
              ),
            },
            value
          ),
        real: () =>
          doTransaction(
            {
              target: to,
              value: Number(
                toMoney(data.USD.bid).replace("R$ ", "").replace(",", ".")
              ),
            },
            { target: from, value: 1 },
            value
          ),
      },
      euro: {
        dollar: () =>
          doTransaction(
            {
              target: to,
              value: Number(
                toMoney(data.EUR.bid).replace("R$ ", "").replace(",", ".")
              ),
            },
            {
              target: from,
              value: Number(
                toMoney(data.USD.bid).replace("R$ ", "").replace(",", ".")
              ),
            },
            value
          ),
        euro: () =>
          showNotification("Por favor, selecione outra moeda!", "warning"),
        real: () =>
          doTransaction(
            {
              target: to,
              value: Number(
                toMoney(data.EUR.bid).replace("R$ ", "").replace(",", ".")
              ),
            },
            { target: from, value: 1 },
            value
          ),
      },
    };
    return dictionary[from][to]();
  };

  return {
    transaction,
    setFee,
    fee,
    value,
    setValue,
  };
}
