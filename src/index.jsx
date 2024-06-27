import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/globals.css";
import App from "./App";
import { ColumnDataProvider } from "./context/ColumnDataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ColumnDataProvider>
    <App />
  </ColumnDataProvider>,
);
