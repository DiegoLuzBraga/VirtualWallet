import currency from "currency.js";

let walletState = {
  real: 5000,
  dollar: 0,
  euro: 0,
};

let fee = {
  from: "real",
  to: "dollar",
};

let transactionValue = 0;

const doTransaction = (state, from, to, value) => {
  if (state[fee.from] < value / 100) {
    return console.log(
      "O valor escolhido é maior do que o limite disponível!",
      "warning"
    );
  } else {
    return {
      ...state,
      [fee.from]: currency(state[fee.from]).subtract(value / 100).value,
      // this operation converts the value passed to reais
      // and converts it again to the coin selected.
      // In a math way: fee.to = fee.to + (value / 100) * from.value / to.value
      [fee.to]: currency(state[fee.to]).add(
        currency(value).divide(100).multiply(from.value).divide(to.value).value
      ).value,
    };
  }
};

export const WalletReducer = (state, action) => {
  switch (action.type) {
    case "REAL_TO_DOLLAR":
      return (walletState = doTransaction(
        { real: state.real, dollar: state.dollar, euro: state.euro },
        "real",
        "dollar",
        state.value
      ));
    case "REAL_TO_EURO":
      return (walletState = doTransaction(
        { real: state.real, dollar: state.dollar, euro: state.euro },
        "real",
        "euro",
        state.value
      ));
    case "REAL_TO_REAL":
      return console.log("Por favor, selecione outra moeda!", "warning");
    case "DOLLAR_TO_REAL":
      return (walletState = doTransaction(
        { real: state.real, dollar: state.dollar, euro: state.euro },
        "dollar",
        "real",
        state.value
      ));
    case "DOLLAR_TO_EURO":
      return (walletState = doTransaction(
        { real: state.real, dollar: state.dollar, euro: state.euro },
        "dollar",
        "euro",
        state.value
      ));
    case "DOLLAR_TO_DOLLAR":
      return console.log("Por favor, selecione outra moeda!", "warning");
    case "EURO_TO_REAL":
      return (walletState = doTransaction(
        { real: state.real, dollar: state.dollar, euro: state.euro },
        "euro",
        "real",
        state.value
      ));
    case "EURO_TO_DOLLAR":
      return (walletState = doTransaction(
        { real: state.real, dollar: state.dollar, euro: state.euro },
        "euro",
        "DOLLAR",
        state.value
      ));
    case "EURO_TO_EURO":
      return console.log("Por favor, selecione outra moeda!", "warning");
    default:
      return walletState;
  }
};

export const FeeReducer = (
  state = {
    from: "real",
    to: "dollar",
  },
  action
) => {
  switch (action.type) {
    case "FROM":
      return (fee = { ...fee, from: state.from });
    case "TO":
      return (fee = { ...fee, to: state.to });
    default:
      return fee;
  }
};

export const TransactionReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_VALUE":
      return (transactionValue = state);
    default:
      return transactionValue;
  }
};
