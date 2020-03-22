import React from "react";
import { Wallet } from "./components/Wallet/Wallet";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { theme } from "./styles/material";
import "./styles/global.scss";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Wallet />
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
