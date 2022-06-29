import React from "react";
import App from "./app.jsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "react-dom";
import configurationReducer from "./features/configuration";
import "../src/index.css";

const store = configureStore({
  reducer: {
    config: configurationReducer,
  },
});

render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("app")
);
