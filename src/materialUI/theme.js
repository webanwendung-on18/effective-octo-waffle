import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
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
  },
  palette: {
    primary: { main: "#6ab04c" }
  },
  typography: {
    fontFamily: ['"Lato"'],
    useNextVariants: true
  }
});
