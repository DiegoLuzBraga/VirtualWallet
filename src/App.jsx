import React from "react";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import {
  WalletReducer,
  FeeReducer,
  TransactionReducer,
} from "../src/reducers/reducers";
import Wallet from "./components/Wallet/Wallet";
import "./styles/global.scss";

const rootReducers = combineReducers({
  wallet: WalletReducer,
  fee: FeeReducer,
  transactionValue: TransactionReducer,
});

const store = createStore(rootReducers);

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <Wallet />
      </Provider>
    </SnackbarProvider>
  );
}

export default App;
