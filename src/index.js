// Set up your application entry point here...
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import muiCustomTheme from "styles/mui-custom-theme";
import injectTapEventPlugin from "react-tap-event-plugin";
import store from "store";
import App from "./App";

import "styles/styles.css";
import { ON_HYBRID_APP } from "constants/env";

const muiTheme = getMuiTheme(muiCustomTheme);
const app = document.getElementById("app");

const startApp = pushNotificationService => {
  injectTapEventPlugin();
  render(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <App />
      </MuiThemeProvider>
    </Provider>,
    app
  );
};

const onDeviceReady = () => {
  /*Code removed*/

  startApp();
};

if (ON_HYBRID_APP) {
  /*Code removed*/
} else {
  startApp();
}
