import React from "react";
import { Wallet } from "./components/Wallet/Wallet";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import "./styles/global.scss";
import { SnackbarProvider } from "notistack";
// import {
//   Provider,
//   createStoreHook,
//   createDispatchHook,
//   createSelectorHook,
// } from "react-redux";
// import { createStore } from "redux";

// const MyContext = React.createContext(null);
// export const useStore = createStoreHook(MyContext);
// export const useDispatch = createDispatchHook(MyContext);
// export const useSelector = createSelectorHook(MyContext);

// const myStore = createStore(rootReducer);

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider>
        <CssBaseline />
        <Wallet />
        {/* <Provider context={MyContext} store={myStore}>
        </Provider> */}
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
