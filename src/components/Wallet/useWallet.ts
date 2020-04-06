import { useState } from "react";
import currency from "currency.js";
import { CurrencyValues, coins } from "../../types/types";
import { useNotification } from "../../hooks/useNotification";
import { toMoney } from "../../helpers/masks";
import values from "../../values.json";

export function useWallet() {
  const data: CurrencyValues = JSON.parse(JSON.stringify(values));

  const [wallet, setWallet] = useState<Record<coins, number>>({
    real: 5000,
    dollar: 0,
    euro: 0
  });

  const [fee, setFee] = useState<{ from: coins; to: coins }>({
    from: "real",
    to: "dollar"
  });

  const [value, setValue] = useState<number>(0);

  const showNotification = useNotification();

  const doTransaction = (
    from: { target: coins; value: number },
    to: { target: coins; value: number },
    value: number
  ) => {
    if (wallet[fee.from] < value / 100) {
      return showNotification(
        "O valor escolhido é maior do que o limite disponível!",
        "warning"
      );
    } else {
      return setWallet({
        ...wallet,
        [fee.from]: currency(wallet[fee.from]).subtract(value / 100).value,
        [fee.to]: currency(wallet[fee.to]).add(
          currency(value)
            .divide(100)
            .multiply(from.value)
            .divide(to.value).value
        ).value
      });
    }
  };

  const transaction = (from: coins, to: coins, value: number) => {
    const dictionary = {
      real: {
        dollar: () =>
          doTransaction(
            { target: from, value: 1 },
            {
              target: to,
              value: Number(
                toMoney(data.USD.bid)
                  .replace("R$ ", "")
                  .replace(",", ".")
              )
            },
            value
          ),
        euro: () =>
          doTransaction(
            { target: from, value: 1 },
            {
              target: to,
              value: Number(
                toMoney(data.EUR.bid)
                  .replace("R$ ", "")
                  .replace(",", ".")
              )
            },
            value
          ),
        real: () =>
          showNotification("Por favor, selecione outra moeda!", "warning")
      },
      dollar: {
        dollar: () =>
          showNotification("Por favor, selecione outra moeda!", "warning"),
        euro: () =>
          doTransaction(
            {
              target: to,
              value: Number(
                toMoney(data.USD.bid)
                  .replace("R$ ", "")
                  .replace(",", ".")
              )
            },
            {
              target: from,
              value: Number(
                toMoney(data.EUR.bid)
                  .replace("R$ ", "")
                  .replace(",", ".")
              )
            },
            value
          ),
        real: () =>
          doTransaction(
            {
              target: to,
              value: Number(
                toMoney(data.USD.bid)
                  .replace("R$ ", "")
                  .replace(",", ".")
              )
            },
            { target: from, value: 1 },
            value
          )
      },
      euro: {
        dollar: () =>
          doTransaction(
            {
              target: to,
              value: Number(
                toMoney(data.EUR.bid)
                  .replace("R$ ", "")
                  .replace(",", ".")
              )
            },
            {
              target: from,
              value: Number(
                toMoney(data.USD.bid)
                  .replace("R$ ", "")
                  .replace(",", ".")
              )
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
                toMoney(data.EUR.bid)
                  .replace("R$ ", "")
                  .replace(",", ".")
              )
            },
            { target: from, value: 1 },
            value
          )
      }
    };
    return dictionary[from][to]();
  };

  return {
    totalInReal: `R$ ${wallet["real"]}`,
    totalInDollar: `$ ${wallet["dollar"]}`,
    totalInEuro: `€ ${wallet["euro"]}`,
    data,
    transaction,
    setFee,
    fee,
    value,
    setValue
  } as const;
}
