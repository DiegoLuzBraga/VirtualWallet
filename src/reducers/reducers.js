import currency from "currency.js";

const walletState = {
  BRL: 5000,
  USD: 0,
  EUR: 0,
};

const fee = {
  from: "BRL",
  to: "USD",
};

const transactionValue = 0;

const doTransaction = (state, from, to, value) => {
  if (state[fee.from] < value / 100) {
    return console.log(
      "O valor escolhido é maior do que o limite disponível!",
      "warning"
    );
  } else {
    console.log(state, from, to, value, state[from], state[to]);
    return {
      ...state,
      [from.target]: currency(state[from.target]).subtract(value / 100).value,
      // this operation converts the value passed to reais
      // and converts it again to the coin selected.
      // In a math way: to = to + (value / 100) * from.value / to.value
      [to.target]: currency(state[to.target]).add(
        currency(value).divide(100).multiply(from.value).divide(to.value).value
      ).value,
    };
  }
};

export const WalletReducer = (state = walletState, action) => {
  switch (action.type) {
    case "BRL_TO_USD":
      return doTransaction(
        {
          BRL: action.values.BRL,
          USD: action.values.USD,
          EUR: action.values.EUR,
        },
        { target: "BRL", value: action.values.from },
        { target: "USD", value: action.values.to },
        action.values.value
      );
    case "BRL_TO_EUR":
      return doTransaction(
        {
          BRL: action.values.BRL,
          USD: action.values.USD,
          EUR: action.values.EUR,
        },
        { target: "BRL", value: action.values.from },
        { target: "EUR", value: action.values.to },
        action.values.value
      );
    case "BRL_TO_BRL":
      return console.log("Por favor, selecione outra moeda!", "warning");
    case "USD_TO_BRL":
      return doTransaction(
        {
          BRL: action.values.BRL,
          USD: action.values.USD,
          EUR: action.values.EUR,
        },
        { target: "USD", value: action.values.from },
        { target: "BRL", value: action.values.to },
        action.values.value
      );
    case "USD_TO_EUR":
      return doTransaction(
        {
          BRL: action.values.BRL,
          USD: action.values.USD,
          EUR: action.values.EUR,
        },
        { target: "USD", value: action.values.from },
        { target: "EUR", value: action.values.to },
        action.values.value
      );
    case "USD_TO_USD":
      return console.log("Por favor, selecione outra moeda!", "warning");
    case "EUR_TO_BRL":
      return doTransaction(
        {
          BRL: action.values.BRL,
          USD: action.values.USD,
          EUR: action.values.EUR,
        },
        { target: "EUR", value: action.values.from },
        { target: "BRL", value: action.values.to },
        action.values.value
      );
    case "EUR_TO_USD":
      return doTransaction(
        {
          BRL: action.values.BRL,
          USD: action.values.USD,
          EUR: action.values.EUR,
        },
        { target: "EUR", value: action.values.from },
        { target: "USD", value: action.values.to },
        action.values.value
      );
    case "EUR_TO_EUR":
      return console.log("Por favor, selecione outra moeda!", "warning");
    default:
      return state;
  }
};

export const FeeReducer = (state = fee, action) => {
  switch (action.type) {
    case "FROM":
      return { ...state, from: action.from };
    case "TO":
      return { ...state, to: action.to };
    default:
      return state;
  }
};

export const TransactionReducer = (state = transactionValue, action) => {
  switch (action.type) {
    case "CHANGE_VALUE":
      return action.total;
    default:
      return state;
  }
};
