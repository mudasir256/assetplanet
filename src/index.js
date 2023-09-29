import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "styled-components";

import { Provider } from "react-redux";
import { configureStore } from "./redux/store";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import store from "./redux/store1";

import Config from "Config";

import { defaultStyles } from "./constants/style-constants/utils";

const client = new ApolloClient({
  uri: Config.api_server,
});

const styles = { ...defaultStyles };

// if (process.env.NODE_ENV === "production") {
//   console.log = () => {};
//   console.error = () => {};
//   console.debug = () => {};
// }
ReactDOM.render(
  <ThemeProvider theme={styles}>
    <ApolloProvider client={client}>
      <Provider store={store}>
        {/* <Provider store={configureStore()}> */}
        <App />
        {/* </Provider> */}
      </Provider>
    </ApolloProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
