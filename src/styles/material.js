import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#50A0DB"
    },
    secondary: {
      main: "#378943"
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      default: "linear-gradient(to bottom, #E6F0FD 8%, #B0CDEF 33%)"
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  }
});
