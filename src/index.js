import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
import "./style.scss";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./assets/styles/custom.scss";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import FirebaseConfig from "./config/firebase-config";
import { Provider } from "react-redux";
import { store } from "./redux/store/index";

firebase.initializeApp(FirebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
