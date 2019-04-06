import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase";
import "./index.scss";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/styles/custom.scss";

var config = {
  apiKey: "AIzaSyCt9gbRk3r0d7fLBFAcgOVNgGFwayc2wug",
  authDomain: "react-mini-project-music-app.firebaseapp.com",
  databaseURL: "https://react-mini-project-music-app.firebaseio.com",
  projectId: "react-mini-project-music-app",
  storageBucket: "react-mini-project-music-app.appspot.com",
  messagingSenderId: "217762414151"
};
firebase.initializeApp(config);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
