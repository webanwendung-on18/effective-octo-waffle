import React from "react";
import ReactDOM from "react-dom";
import "./sass/main.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { theme } from "./materialUI/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
