import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  // https://material-ui.com/customization/default-theme/
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          background:
            "linear-gradient(to right, rgba(20, 30, 20, 0.7), rgba(30, 30, 50, 0.7)), url(https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80)",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "norepeat",
          backgroundSize: "cover"
        }
      }
    }
    // https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Button/Button.js
    // MuiButton: {
    //   root: {
    //     color: "red"
    //   },
    //   containedPrimary: {
    //     color: "white"
    //   }
    // }
  },
  // https://material-ui.com/customization/components/#theme-variables
  // Helper -> https://material-ui.com/customization/default-theme/
  palette: {
    primary: { main: "#6ab04c" }
  },
  typography: {
    // button: {
    //   fontSize: "2rem"
    // },
    useNextVariants: true
  }
});
