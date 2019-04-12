import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
import "./index.scss";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./assets/styles/custom.scss";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import FirebaseConfig from "./config/firebase-config";

firebase.initializeApp(FirebaseConfig);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
