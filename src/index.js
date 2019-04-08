import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/styles/custom.scss";
import "./config/firebase-config";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
